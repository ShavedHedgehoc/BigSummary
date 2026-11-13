import {
  Injectable,
  // Logger
} from '@nestjs/common';
import { mssqlPrisma, Prisma } from '@repo/db-mssql';
import {
  TApplicationDeleteTraceWeightingInput,
  TApplicationDeleteTraceWeightingResponse,
  TApplicationTraceWeightingDetailItem,
  TApplicationTraceWeightingListAllRowsInput,
  TApplicationTraceWeightingListAllRowsResponse,
  TApplicationTraceWeightingListInput,
  TApplicationTraceWeightingListPaginatedInput,
  TApplicationTraceWeightingListPaginatedResponse,
  TApplicationTraceWeightingListResponse,
  TApplicationTraceWeightingListRowItem,
} from '@repo/schemas';
import { IApplicationTraceWeightingService } from '@repo/trpc';
import { TRPCError } from '@trpc/server';

const WeightingWithContainerCounts = {
  Containers: {
    select: {
      ContainerPK: true,
      _count: {
        select: {
          Weightings: true,
          Loads: true,
        },
      },
    },
  },
} satisfies Prisma.WeightingsInclude;

@Injectable()
export class ApplicationTraceWeightingService implements IApplicationTraceWeightingService {
  //   private readonly logger = new Logger(ApplicationTraceWeightingService.name);

  async deleteWeighting(
    input: TApplicationDeleteTraceWeightingInput,
  ): Promise<TApplicationDeleteTraceWeightingResponse> {
    try {
      return await mssqlPrisma.$transaction(async (tx) => {
        const weighting = await tx.weightings.findUnique({
          where: { WeightingsPK: input.id },
          include: WeightingWithContainerCounts,
        });

        if (!weighting) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Строка для удаления не найдена',
          });
        }

        const container = weighting.Containers;

        if (container._count.Loads > 0) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Удаление невозможно: контейнер уже загружен в аппарат!',
          });
        }

        await tx.weightings.delete({
          where: { WeightingsPK: input.id },
        });

        if (container._count.Weightings === 1) {
          await tx.containers.delete({
            where: { ContainerPK: container.ContainerPK },
          });
        }

        return { success: true, id: input.id };
      });
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }

      //   this.logger.error(
      //     `Ошибка при удалении взвешивания ID ${input.id}`,
      //     error instanceof Error ? error.stack : String(error),
      //   );

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Неизвестная ошибка!',
      });
    }
  }

  async getWeightingList(
    input: TApplicationTraceWeightingListAllRowsInput,
  ): Promise<TApplicationTraceWeightingListAllRowsResponse>;

  async getWeightingList(
    input: TApplicationTraceWeightingListPaginatedInput,
  ): Promise<TApplicationTraceWeightingListPaginatedResponse>;

  async getWeightingList(
    input: TApplicationTraceWeightingListInput,
  ): Promise<TApplicationTraceWeightingListResponse>;

  async getWeightingList(
    input: TApplicationTraceWeightingListInput,
  ): Promise<TApplicationTraceWeightingListResponse> {
    const {
      batchName,
      sortByBatch,
      productId,
      startDate,
      endDate,
      plants,
      compare,
      limit = 50,
      page = 1,
      getAllRows,
    } = input;

    const safeLimit = Math.max(1, limit);
    const safePage = Math.max(1, page);
    const offset = safeLimit * (safePage - 1);

    let startDateParam: Date | null = null;
    if (startDate) {
      startDateParam = new Date(startDate);
      startDateParam.setUTCHours(0, 0, 0, 0);
    }

    let endDateParam: Date | null = null;
    if (endDate) {
      endDateParam = new Date(endDate);
      endDateParam.setUTCHours(0, 0, 0, 0);
      endDateParam.setUTCDate(endDateParam.getUTCDate() + 1);
    }

    const escapeLike = (val: string) => val.replace(/[\\%_[\]]/g, '\\$&');
    const batchNameParam = batchName ? `%${escapeLike(batchName)}%` : null;
    const productIdParam = productId ? `%${escapeLike(productId)}%` : null;
    const compareFlag = compare ? 1 : 0;

    const plantFilter = plants?.length
      ? Prisma.sql`AND Plant IN (${Prisma.join(plants)})`
      : Prisma.empty;

    const orderClause = sortByBatch
      ? Prisma.raw('b.BatchYear ASC, b.BatchMonth ASC, b.BatchNumber ASC, prod.ProductName ASC')
      : Prisma.raw('prod.ProductName ASC, b.BatchYear ASC, b.BatchMonth ASC, b.BatchNumber ASC');

    type RawReportRow = Omit<TApplicationTraceWeightingListRowItem, 'weightings'> & {
      totalCount: number;
    };

    const rawRows = await mssqlPrisma.$queryRaw<RawReportRow[]>`
      WITH FilteredBatches AS (
        SELECT BatchPK, BatchName, Plant, BatchDate, BatchYear, BatchMonth, BatchNumber
        FROM Batchs
        WHERE (${startDateParam} IS NULL OR BatchDate >= CAST(${startDateParam} AS DATETIME))
          AND (${endDateParam} IS NULL OR BatchDate < CAST(${endDateParam} AS DATETIME))
          AND (${batchNameParam} IS NULL OR BatchName LIKE CAST(${batchNameParam} AS VARCHAR(255)) ESCAPE '\\')
          ${plantFilter}
      ),
      MergedAgg AS (
        SELECT
          src.BatchPK AS batchId,
          src.ProductId AS productId,
          SUM(src.planQty) AS planQuantity,
          SUM(src.factQty) AS factQuantity
        FROM (
          SELECT BatchPK, ProductId, Quantity AS planQty, CAST(0 AS FLOAT) AS factQty FROM Boils
          UNION ALL
          SELECT BatchPK, ProductId, CAST(0 AS FLOAT) AS planQty, Quantity AS factQty FROM Weightings
        ) src
        INNER JOIN FilteredBatches b ON b.BatchPK = src.BatchPK
        WHERE (${productIdParam} IS NULL OR src.ProductId LIKE CAST(${productIdParam} AS VARCHAR(50)) ESCAPE '\\')
        GROUP BY src.BatchPK, src.ProductId
      )
      SELECT
        m.batchId,
        b.BatchName AS batchName,
        pl.PlantName AS plantName,
        b.BatchDate AS batchDate,
        m.productId,
        COALESCE(prod.ProductName, '') AS productName,
        CAST(m.planQuantity AS FLOAT) AS planQuantity,
        CAST(m.factQuantity AS FLOAT) AS factQuantity,
        b.BatchYear AS batchYear,
        b.BatchMonth AS batchMonth,
        b.BatchNumber AS batchNumber,
        COUNT(*) OVER() AS totalCount
      FROM MergedAgg m
      INNER JOIN FilteredBatches b ON b.BatchPK = m.batchId
      LEFT JOIN Products prod ON prod.ProductId = m.productId
      LEFT JOIN Plants pl ON b.Plant = pl.PlantAlias
      WHERE (${compareFlag} = 0 OR ABS(m.planQuantity - m.factQuantity) > 0.0001)
      ORDER BY ${orderClause}
      ${getAllRows ? Prisma.empty : Prisma.raw(`OFFSET ${offset} ROWS FETCH NEXT ${safeLimit} ROWS ONLY`)}
      OPTION (RECOMPILE);
    `;

    const total = rawRows.length > 0 ? Number(rawRows[0].totalCount) : 0;
    const totalPages = getAllRows ? (total > 0 ? 1 : 0) : Math.ceil(total / safeLimit);

    const weightingsMap = new Map<string, TApplicationTraceWeightingDetailItem[]>();

    if (!getAllRows && rawRows.length > 0) {
      const pairs = rawRows.map((r) => Prisma.sql`(${r.batchId}, ${r.productId})`);

      const relatedWeightings = await mssqlPrisma.$queryRaw<
        TApplicationTraceWeightingDetailItem[]
      > /* sql */ `
        WITH
          TargetWeightings AS (
            SELECT
              w.WeightingsPK,
              w.BatchPK,
              w.ContainerPK,
              w.ProductId,
              w.LotPK,
              w.DocumentPK,
              w.Quantity
            FROM
              Weightings w
              INNER JOIN (
                VALUES
                  ${Prisma.join(pairs)}
              ) AS keys (BatchPK, ProductId) ON w.BatchPK = keys.BatchPK
              AND w.ProductId = keys.ProductId
          ),
          ContainerCounts AS (
            SELECT
              w.ContainerPK,
              COUNT(w.ContainerPK) AS recordsCnt
            FROM
              Weightings w
            WHERE
              w.ContainerPK IN (
                SELECT DISTINCT
                  ContainerPK
                FROM
                  TargetWeightings
                WHERE
                  ContainerPK IS NOT NULL
              )
            GROUP BY
              w.ContainerPK
          ),
          LoadDates AS (
            SELECT
              l.ContainerPK,
              MAX(doc.CreateDate) AS loadDate
            FROM
              Loads l
              INNER JOIN Documents doc ON l.DocumentPK = doc.DocumentPK
            WHERE
              l.ContainerPK IN (
                SELECT DISTINCT
                  ContainerPK
                FROM
                  TargetWeightings
                WHERE
                  ContainerPK IS NOT NULL
              )
            GROUP BY
              l.ContainerPK
          )
        SELECT
          tw.WeightingsPK AS weightingId,
          tw.BatchPK AS batchId,
          tw.ContainerPK AS containerId,
          tw.ProductId AS productId,
          COALESCE(prod.ProductName, '') AS productName,
          l.LotName AS lotName,
          CAST(tw.Quantity AS FLOAT) AS quantity,
          a.AuthorName AS authorName,
          d.CreateDate AS weightingDate,
          COALESCE(cc.recordsCnt, 0) AS containerRecordsCount,
          ld.loadDate AS loadingDate
        FROM
          TargetWeightings tw
          LEFT JOIN Products prod ON prod.ProductId = tw.ProductId
          LEFT JOIN Lots l ON l.LotPK = tw.LotPK
          LEFT JOIN Documents d ON d.DocumentPK = tw.DocumentPK
          LEFT JOIN Authors a ON a.AuthorPK = d.AuthorPK
          LEFT JOIN ContainerCounts cc ON cc.ContainerPK = tw.ContainerPK
          LEFT JOIN LoadDates ld ON ld.ContainerPK = tw.ContainerPK
        ORDER BY
          d.CreateDate ASC,
          tw.WeightingsPK ASC;
      `;

      for (const item of relatedWeightings) {
        const key = `${item.batchId}_${item.productId}`;
        const list = weightingsMap.get(key) ?? [];
        list.push(item);
        weightingsMap.set(key, list);
      }
    }

    const rows: TApplicationTraceWeightingListRowItem[] = rawRows.map(
      ({ totalCount: _, ...row }) => ({
        ...row,
        weightings: !getAllRows
          ? (weightingsMap.get(`${row.batchId}_${row.productId}`) ?? [])
          : undefined,
      }),
    );

    return {
      total,
      totalPages,
      rows,
    };
  }
}
