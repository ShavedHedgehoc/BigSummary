import {
  Injectable,
  // Logger
} from '@nestjs/common';
import { mssqlPrisma, Prisma } from '@repo/db-mssql';
import {
  TApplicationDeleteTraceWeightingInput,
  TApplicationDeleteTraceWeightingResponse,
  TApplicationTraceWeightingDetailItem,
  TApplicationTraceWeightingListInput,
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
    input: TApplicationTraceWeightingListInput,
  ): Promise<TApplicationTraceWeightingListResponse> {
    const { batchDate, batchName, productId, plants, compare, excludeProductIds } = input;

    const normalizedExcludeIds = excludeProductIds?.length
      ? Array.from(new Set(excludeProductIds.map((id) => id.trim()).filter(Boolean)))
      : [];

    // 1. Границы одного дня в UTC
    const rawDate = new Date(batchDate);
    const startOfDay = new Date(
      Date.UTC(rawDate.getUTCFullYear(), rawDate.getUTCMonth(), rawDate.getUTCDate()),
    );
    const endOfDay = new Date(
      Date.UTC(rawDate.getUTCFullYear(), rawDate.getUTCMonth(), rawDate.getUTCDate() + 1),
    );

    // 2. Условия фильтрации
    const andConditions: Prisma.vw_FinalBatchStatusWhereInput[] = [
      { BatchDate: { gte: startOfDay, lt: endOfDay } },
    ];

    if (batchName) {
      andConditions.push({ BatchName: { contains: batchName } });
    }
    if (plants?.length) {
      andConditions.push({ Plant: { in: plants } });
    }
    if (productId) {
      andConditions.push({ ProductId: { contains: productId } });
    }
    if (normalizedExcludeIds.length > 0) {
      andConditions.push({
        ProductId: { notIn: normalizedExcludeIds },
      });
    }
    if (compare) {
      andConditions.push({
        ProblemStatus: { in: ['WEIGHT_MISMATCH', 'BOTH_MISMATCH'] },
      });
    }

    // 3. Параллельно получаем строки из представления, справочник площадок и справочник продуктов
    const [viewRows, allPlants, allProducts] = await Promise.all([
      mssqlPrisma.vw_FinalBatchStatus.findMany({
        where: { AND: andConditions },
      }),
      mssqlPrisma.plants.findMany({
        select: { PlantAlias: true, PlantName: true },
      }),
      mssqlPrisma.products.findMany({
        select: { ProductId: true, ProductName: true },
      }),
    ]);

    const plantMap = new Map(allPlants.map((p) => [p.PlantAlias, p.PlantName]));
    const productMap = new Map(allProducts.map((p) => [p.ProductId.trim(), p.ProductName ?? '']));

    // 4. Подгружаем фактические отвесы (Weightings) с защитой от лимита 2100 параметров MS SQL
    const uniqueBatchIds = Array.from(new Set(viewRows.map((r) => r.BatchPK)));
    const weightingsMap = new Map<string, TApplicationTraceWeightingDetailItem[]>();

    const chunkArray = <T>(arr: T[], size: number): T[][] => {
      const chunks: T[][] = [];
      for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
      }
      return chunks;
    };

    if (uniqueBatchIds.length > 0) {
      const batchChunks = chunkArray(uniqueBatchIds, 1000);

      const weightingsChunks = await Promise.all(
        batchChunks.map((batchChunk) =>
          mssqlPrisma.weightings.findMany({
            where: {
              BatchPK: { in: batchChunk },
              ...(productId ? { ProductId: { contains: productId } } : {}),
            },
            include: {
              Products: { select: { ProductName: true } },
              Lots: { select: { LotName: true } },
              Documents: {
                select: {
                  CreateDate: true,
                  Authors: { select: { AuthorName: true } },
                },
              },
            },
          }),
        ),
      );

      const rawWeightings = weightingsChunks.flat();

      const containerIds = Array.from(
        new Set(rawWeightings.map((w) => w.ContainerPK).filter((id): id is number => id !== null)),
      );

      const countMap = new Map<number, number>();
      const loadDateMap = new Map<number, Date>();

      if (containerIds.length > 0) {
        const idChunks = chunkArray(containerIds, 1000);

        const chunkResults = await Promise.all(
          idChunks.map((chunk) =>
            Promise.all([
              mssqlPrisma.weightings.groupBy({
                by: ['ContainerPK'],
                where: { ContainerPK: { in: chunk } },
                _count: { _all: true },
              }),
              mssqlPrisma.loads.findMany({
                where: { ContainerPK: { in: chunk } },
                select: {
                  ContainerPK: true,
                  Documents: { select: { CreateDate: true } },
                },
              }),
            ]),
          ),
        );

        for (const [counts, loads] of chunkResults) {
          for (const c of counts) {
            countMap.set(c.ContainerPK, c._count._all);
          }

          for (const load of loads) {
            const docDate = load.Documents?.CreateDate;
            if (load.ContainerPK !== null && docDate) {
              const prev = loadDateMap.get(load.ContainerPK);
              if (!prev || docDate > prev) {
                loadDateMap.set(load.ContainerPK, docDate);
              }
            }
          }
        }
      }

      for (const w of rawWeightings) {
        const key = `${w.BatchPK}_${w.ProductId.trim()}`;
        const list = weightingsMap.get(key) ?? [];

        list.push({
          weightingId: w.WeightingsPK,
          batchId: w.BatchPK,
          containerId: w.ContainerPK,
          productId: w.ProductId,
          productName: w.Products?.ProductName ?? productMap.get(w.ProductId.trim()) ?? '',
          lotName: w.Lots?.LotName ?? null,
          quantity: Number(w.Quantity ?? 0),
          authorName: w.Documents?.Authors?.AuthorName ?? null,
          weightingDate: w.Documents?.CreateDate ?? null,
          containerRecordsCount: w.ContainerPK ? (countMap.get(w.ContainerPK) ?? 0) : 0,
          loadingDate: w.ContainerPK ? (loadDateMap.get(w.ContainerPK) ?? null) : null,
        });

        weightingsMap.set(key, list);
      }

      // Сортируем отвесы внутри каждой позиции по времени взвешивания
      weightingsMap.forEach((list) => {
        list.sort((a, b) => {
          const tA = a.weightingDate ? new Date(a.weightingDate).getTime() : 0;
          const tB = b.weightingDate ? new Date(b.weightingDate).getTime() : 0;
          return tA - tB || a.weightingId - b.weightingId;
        });
      });
    }

    // 5. Формируем строки отчёта с названием сырья (rawMaterialName)

    const rows: TApplicationTraceWeightingListRowItem[] = viewRows.map((v) => {
      const trimmedProductId = v.ProductId.trim();
      const itemWeightings = weightingsMap.get(`${v.BatchPK}_${trimmedProductId}`) ?? [];
      const rawMaterialName =
        itemWeightings[0]?.productName || productMap.get(trimmedProductId) || v.ProductName || '';

      return {
        batchId: v.BatchPK,
        batchName: v.BatchName,
        plantName: v.Plant ? (plantMap.get(v.Plant) ?? null) : null,
        batchDate: v.BatchDate ?? null,
        productId: v.ProductId,
        productName: rawMaterialName,
        planQuantity: Number(v.TotalPlanned ?? 0),
        factQuantity: Number(v.TotalWeighting ?? 0),
        batchYear: v.BatchYear ?? 0,
        batchMonth: v.BatchMonth ?? '',
        batchNumber: v.BatchNumber ?? 0,
        weightings: itemWeightings,
      };
    });

    // 6. Сортируем итоговый массив строго по названию сырья (rawMaterialName), затем по партии
    rows.sort(
      (a, b) =>
        a.productName.localeCompare(b.productName, 'ru') ||
        a.batchYear - b.batchYear ||
        a.batchMonth.localeCompare(b.batchMonth) ||
        a.batchNumber - b.batchNumber,
    );

    return {
      rows,
      total: rows.length,
      totalPages: rows.length > 0 ? 1 : 0,
    };
  }
}
