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

    const safeLimit = Math.min(1000, Math.max(1, limit));
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

    const batchConditions: Prisma.Sql[] = [];

    if (startDateParam) {
      batchConditions.push(Prisma.sql`BatchDate >= ${startDateParam}`);
    }
    if (endDateParam) {
      batchConditions.push(Prisma.sql`BatchDate < ${endDateParam}`);
    }
    if (batchNameParam) {
      batchConditions.push(Prisma.sql`BatchName LIKE ${batchNameParam} ESCAPE '\\'`);
    }
    if (plants?.length) {
      batchConditions.push(Prisma.sql`Plant IN (${Prisma.join(plants)})`);
    }

    const batchWhereClause = batchConditions.length
      ? Prisma.sql`WHERE ${Prisma.join(batchConditions, ' AND ')}`
      : Prisma.empty;

    const boilProductWhere = productIdParam
      ? Prisma.sql`WHERE bl.ProductId LIKE ${productIdParam} ESCAPE '\\'`
      : Prisma.empty;

    const weightProductWhere = productIdParam
      ? Prisma.sql`WHERE w.ProductId LIKE ${productIdParam} ESCAPE '\\'`
      : Prisma.empty;

    const compareHavingClause = compare
      ? Prisma.sql`HAVING ABS(SUM(s.planQuantity) - SUM(s.factQuantity)) > 0.0001`
      : Prisma.empty;

    const t0 = performance.now();

    const orderClause = sortByBatch
      ? Prisma.raw('b.BatchYear ASC, b.BatchMonth ASC, b.BatchNumber ASC, prod.ProductName ASC')
      : Prisma.raw('prod.ProductName ASC, b.BatchYear ASC, b.BatchMonth ASC, b.BatchNumber ASC');

    type RawReportRow = Omit<TApplicationTraceWeightingListRowItem, 'weightings'> & {
      totalCount: number;
    };

    const rawRows = await mssqlPrisma.$queryRaw<RawReportRow[]> /* sql */ `
      WITH
        FilteredBatches AS (
          SELECT
            BatchPK
          FROM
            Batchs
            ${batchWhereClause}
        ),
        AllSums AS (
          SELECT
            bl.BatchPK AS batchId,
            bl.ProductId AS productId,
            SUM(bl.Quantity) AS planQuantity,
            CAST(0 AS FLOAT) AS factQuantity
          FROM
            FilteredBatches b
            INNER JOIN Boils bl ON bl.BatchPK = b.BatchPK
            ${boilProductWhere}
          GROUP BY
            bl.BatchPK,
            bl.ProductId
          UNION ALL
          SELECT
            w.BatchPK AS batchId,
            w.ProductId AS productId,
            CAST(0 AS FLOAT) AS planQuantity,
            SUM(w.Quantity) AS factQuantity
          FROM
            FilteredBatches b
            INNER JOIN Weightings w ON w.BatchPK = b.BatchPK
            ${weightProductWhere}
          GROUP BY
            w.BatchPK,
            w.ProductId
        ),
        Grouped AS (
          SELECT
            s.batchId,
            s.productId,
            SUM(s.planQuantity) AS planQuantity,
            SUM(s.factQuantity) AS factQuantity
          FROM
            AllSums s
          GROUP BY
            s.batchId,
            s.productId
            ${compareHavingClause}
        )
      SELECT
        g.batchId,
        b.BatchName AS batchName,
        pl.PlantName AS plantName,
        b.BatchDate AS batchDate,
        g.productId,
        COALESCE(prod.ProductName, '') AS productName,
        CAST(g.planQuantity AS FLOAT) AS planQuantity,
        CAST(g.factQuantity AS FLOAT) AS factQuantity,
        b.BatchYear AS batchYear,
        b.BatchMonth AS batchMonth,
        b.BatchNumber AS batchNumber,
        COUNT(*) OVER () AS totalCount
      FROM
        Grouped g
        INNER JOIN Batchs b ON b.BatchPK = g.batchId
        LEFT JOIN Products prod ON prod.ProductId = g.productId
        LEFT JOIN Plants pl ON b.Plant = pl.PlantAlias
      ORDER BY
        ${orderClause}
        ${getAllRows
          ? Prisma.empty
          : Prisma.raw(`OFFSET ${offset} ROWS FETCH NEXT ${safeLimit} ROWS ONLY`)}
    `;

    const total = rawRows.length > 0 ? Number(rawRows[0].totalCount) : 0;
    const totalPages = getAllRows ? (total > 0 ? 1 : 0) : Math.ceil(total / safeLimit);

    const weightingsMap = new Map<string, TApplicationTraceWeightingDetailItem[]>();

    if (!getAllRows && rawRows.length > 0) {
      const pairs = rawRows.map((r) => Prisma.sql`(${r.batchId}, ${r.productId})`);

      const relatedWeightings = await mssqlPrisma.$queryRaw<
        TApplicationTraceWeightingDetailItem[]
      > /* sql */ `
        DECLARE @TargetWeightings
        TABLE (
          WeightingsPK INT PRIMARY KEY,
          BatchPK INT,
          ContainerPK INT NULL,
          ProductId VARCHAR(50),
          LotPK INT NULL,
          DocumentPK INT NULL,
          Quantity FLOAT
        );

        INSERT INTO
          @TargetWeightings (
            WeightingsPK,
            BatchPK,
            ContainerPK,
            ProductId,
            LotPK,
            DocumentPK,
            Quantity
          )
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
          AND w.ProductId = keys.ProductId;

        WITH
          DistinctContainers AS (
            SELECT DISTINCT
              ContainerPK
            FROM
              @TargetWeightings
            WHERE
              ContainerPK IS NOT NULL
          ),
          ContainerCounts AS (
            SELECT
              w.ContainerPK,
              COUNT(*) AS recordsCnt
            FROM
              DistinctContainers dc
              INNER JOIN Weightings w ON w.ContainerPK = dc.ContainerPK
            GROUP BY
              w.ContainerPK
          ),
          LoadDates AS (
            SELECT
              l.ContainerPK,
              MAX(doc.CreateDate) AS loadDate
            FROM
              DistinctContainers dc
              INNER JOIN Loads l ON l.ContainerPK = dc.ContainerPK
              INNER JOIN Documents doc ON l.DocumentPK = doc.DocumentPK
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
          tw.Quantity AS quantity,
          a.AuthorName AS authorName,
          d.CreateDate AS weightingDate,
          COALESCE(cc.recordsCnt, 0) AS containerRecordsCount,
          ld.loadDate AS loadingDate
        FROM
          @TargetWeightings tw
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
