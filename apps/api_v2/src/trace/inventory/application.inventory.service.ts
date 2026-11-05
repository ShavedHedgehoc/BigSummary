import { Injectable } from '@nestjs/common';
import { mssqlPrisma, Prisma } from '@repo/db-mssql';
import {
  TApplicationDeleteTraceInventoryInput,
  TApplicationDeleteTraceInventoryResponse,
  TApplicationGetTraceInventoryDetailInput,
  TApplicationGetTraceInventoryListInput,
  TApplicationTraceInventoryDetailHeader,
  TApplicationTraceInventoryDetailResponse,
  TApplicationTraceInventoryDetailRowItem,
  TApplicationTraceInventoryItem,
  TApplicationTraceInventoryListResponse,
} from '@repo/schemas';
import { IApplicationTraceInventoryService } from '@repo/trpc';
import { TRPCError } from '@trpc/server';

const inventoryDocsWithRelationsInclude = {
  Plants: true,
  InventoryRows: true,
} satisfies Prisma.InventoryDocsInclude;

type TInventoryDocsWithRelations = Prisma.InventoryDocsGetPayload<{
  include: typeof inventoryDocsWithRelationsInclude;
}>;
// const inventoryDocDetailWithRelationsInclude = {
//   Plants: true,
//   InventoryRows: {
//     include: {
//       Products: true,
//     },
//   },
// } satisfies Prisma.InventoryDocsInclude;

// type TInventoryDocDetailWithRelations = Prisma.InventoryDocsGetPayload<{
//   include: typeof inventoryDocDetailWithRelationsInclude;
// }>;

@Injectable()
export class ApplicationTraceInventoryService implements IApplicationTraceInventoryService {
  async getInventoryList(
    input: TApplicationGetTraceInventoryListInput,
  ): Promise<TApplicationTraceInventoryListResponse> {
    const { startDate, endDate, plants, limit, page } = input;
    const skip = (page - 1) * limit;

    const startOfDay = new Date(startDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(endDate);
    endOfDay.setHours(23, 59, 59, 999);

    const andConditions: Prisma.InventoryDocsWhereInput[] = [
      { InventoryDate: { gte: new Date(startOfDay), lte: endOfDay } },
    ];

    if (plants && plants.length > 0) {
      andConditions.push({ PlantPK: { in: plants.map((x) => Number(x)) } });
    }

    const [items, total] = await Promise.all([
      mssqlPrisma.inventoryDocs.findMany({
        where: { AND: andConditions },
        include: inventoryDocsWithRelationsInclude,
        take: limit,
        skip: skip,
        orderBy: { InventoryDate: 'asc' },
      }),
      mssqlPrisma.inventoryDocs.count({
        where: { AND: andConditions },
      }),
    ]);

    const rows: TApplicationTraceInventoryItem[] = items.map(
      (item: TInventoryDocsWithRelations) => {
        return {
          id: item.InventoryDocPK,
          date: item.InventoryDate,
          isFinished: item.Finished,
          plant: item.Plants?.PlantName ?? null,
          recordsCount: item.InventoryRows?.length ?? 0,
        };
      },
    );
    const totalPages = Math.ceil(total / limit);
    return {
      rows,
      total,
      totalPages,
    };
  }

  async getInventoryDetail(
    input: TApplicationGetTraceInventoryDetailInput,
  ): Promise<TApplicationTraceInventoryDetailResponse> {
    const { inventoryId, productCode, dayToExpireRest, applyFilter } = input;

    const docWhereConditions: Prisma.InventoryDocsWhereInput = { InventoryDocPK: inventoryId };
    const rowAndConditions: Prisma.InventoryRowsWhereInput[] = [];

    if (productCode !== '') {
      rowAndConditions.push({
        Products: { ProductId: { contains: productCode } },
      });
    }

    const hasDayRestFilter = dayToExpireRest && dayToExpireRest.length > 0;
    const dayRest = hasDayRestFilter ? Number(dayToExpireRest[0]) : null;

    if (hasDayRestFilter && dayRest !== null && !isNaN(dayRest) && applyFilter) {
      const currentDate = new Date();
      const dayRest = Number(dayToExpireRest[0]);
      currentDate.setHours(0, 0, 0, 0);
      currentDate.setDate(currentDate.getDate() + dayRest);
      rowAndConditions.push({
        ExpDate: { lt: currentDate },
      });
    }

    const inventory = await mssqlPrisma.inventoryDocs.findFirst({
      where: docWhereConditions,
      include: {
        Plants: true,
        InventoryRows: {
          where: { AND: rowAndConditions },
          include: {
            Authors: true,
            Lots: true,
            Products: true,
          },
        },
      },
    });

    if (!inventory) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Документ не найден',
      });
    }

    const header: TApplicationTraceInventoryDetailHeader = {
      id: inventory.InventoryDocPK,
      plantId: inventory.PlantPK,
      plant: inventory.Plants?.PlantName ?? null,
      date: inventory.InventoryDate,
    };

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const rows: TApplicationTraceInventoryDetailRowItem[] = (inventory.InventoryRows ?? []).map(
      (item) => {
        let daysToExp = 0;
        if (item.ExpDate) {
          const expDate = new Date(item.ExpDate);
          expDate.setHours(0, 0, 0, 0);
          const diffTime = expDate.getTime() - now.getTime();
          daysToExp = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }
        const isLessThenExpRest = dayRest !== null ? daysToExp <= dayRest : false;
        return {
          id: item.InventoryRowPK,
          productId: item.ProductId,
          productName: item.Products?.ProductName ?? null,
          lotId: item.LotPK,
          lotName: item.Lots?.LotName ?? null,
          quantity: Number(item.Quantity),
          expDate: item.ExpDate,
          authorName: item.Authors?.AuthorName ?? null,
          daysToExp,
          isLessThenExpRest,
        };
      },
    );

    return { header, rows };
  }

  async deleteInventory(
    input: TApplicationDeleteTraceInventoryInput,
  ): Promise<TApplicationDeleteTraceInventoryResponse> {
    const inventory = await mssqlPrisma.inventoryDocs.findUnique({
      where: { InventoryDocPK: input.id },
      include: inventoryDocsWithRelationsInclude,
    });
    if (!inventory) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Документ для удаления не найден',
      });
    }
    const totalRecords = inventory.InventoryRows?.length ?? 0;
    if (totalRecords > 0) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Удаление невозможно!',
      });
    }
    try {
      await mssqlPrisma.inventoryDocs.delete({ where: { InventoryDocPK: input.id } });
      return { success: true, id: input.id };
    } catch {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Неизвестная ошибка!',
      });
    }
  }
}
