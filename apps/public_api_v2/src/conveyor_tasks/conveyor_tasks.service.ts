import { Injectable } from '@nestjs/common';
import { pgPrisma, Prisma } from '@repo/db-postgres';
import { TPublicApiConveyorTaskListItem, TPublicApiConveyorTaskListResponse } from '@repo/schemas';

const recordWithRelationsInclude = {
  docs: { include: { plants: true } },
  conveyors: true,
  products: true,
  boils: true,
  histories: {
    take: 1,
    orderBy: { id: 'desc' },
    include: {
      history_types: true,
    },
  },
} as const;

type TRecordWithRelations = Prisma.recordsGetPayload<{
  include: typeof recordWithRelationsInclude;
}>;

const DigitalMarkingNames = ['ЧЗ', 'ЧЗл'];

@Injectable()
export class ConveyorTasksService {
  async getTasks({
    conveyor,
    record_id,
    barcode,
    allRecords,
  }: {
    conveyor: string | undefined;
    record_id: number | undefined;
    barcode: string | undefined;
    allRecords: boolean | undefined;
  }): Promise<TPublicApiConveyorTaskListResponse> {
    const moscowDateStr = new Date().toLocaleDateString('en-CA', {
      timeZone: 'Europe/Moscow',
    });
    const startOfDay = new Date(`${moscowDateStr}T00:00:00+03:00`);
    const endOfDay = new Date(`${moscowDateStr}T23:59:59.999+03:00`);

    const whereClause: Prisma.recordsWhereInput = {};

    whereClause.docs = {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    };

    if (conveyor) {
      whereClause.conveyors = {
        value: { equals: conveyor },
      };
    }

    if (record_id) {
      whereClause.id = record_id;
    }

    if (barcode) {
      whereClause.conveyors = { barcode: barcode };
    }

    if (allRecords === true) {
      whereClause.OR = DigitalMarkingNames.map((pattern) => ({
        dm: { contains: pattern },
      }));
    }

    const records: TRecordWithRelations[] = await pgPrisma.records.findMany({
      include: recordWithRelationsInclude,
      where: whereClause,
    });

    const recordsResult: TPublicApiConveyorTaskListResponse = records.map(
      (item): TPublicApiConveyorTaskListItem => {
        const latestHistory = item.histories?.[0];
        return {
          date: item.docs?.date ?? null,
          record_id: item.id,
          conveyor_name: item.conveyors?.value ?? null,
          code_1C: item.products?.code1C ?? null,
          marking: item.products?.marking ?? null,
          boil_value: item.boils?.value ?? null,
          plan: item.plan,
          state: latestHistory?.history_types?.value ?? null,
          state_description: latestHistory?.history_types?.description ?? null,
          plant: item.docs?.plants?.value ?? null,
        };
      },
    );

    return recordsResult;
  }
}
