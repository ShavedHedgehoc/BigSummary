import { Injectable } from '@nestjs/common';
import { pgPrisma, Prisma } from '@repo/db-postgres';

export const recordWithRelationsInclude = {
  products: true,
  boils: true,
  apparatuses: true,
  cans: true,
  conveyors: true,
  workshops: true,
} as const;

export type TRecordWithRelations = Prisma.recordsGetPayload<{
  include: typeof recordWithRelationsInclude;
}>;

@Injectable()
export class RecordCommonService {
  async getRecordsByDocId(docId: number): Promise<TRecordWithRelations[]> {
    const records = await pgPrisma.records.findMany({
      where: { doc_id: docId },
      include: recordWithRelationsInclude,
      orderBy: { id: 'asc' },
    });
    return records;
  }

  async getRecordById(id: number): Promise<TRecordWithRelations> {
    const record = await pgPrisma.records.findUnique({
      where: { id },
      include: recordWithRelationsInclude,
    });
    return record;
  }

  async getRecordsByBoilId(boilId: number): Promise<TRecordWithRelations[]> {
    const records = await pgPrisma.records.findMany({
      where: { boilId },
      include: recordWithRelationsInclude,
    });
    return records;
  }

  async getCurrentRecordByBoilAndCode(boilValue: string, code: string, plantId: number | null) {
    const moscowDateStr = new Date().toLocaleDateString('en-CA', {
      timeZone: 'Europe/Moscow',
    });

    const startOfDay = new Date(`${moscowDateStr}T00:00:00+03:00`);
    const endOfDay = new Date(`${moscowDateStr}T23:59:59.999+03:00`);
    const record = await pgPrisma.records.findFirst({
      where: {
        docs: {
          date: {
            gte: startOfDay,
            lte: endOfDay,
          },
          plantId,
        },
        boils: {
          value: boilValue,
        },
        products: {
          code1C: code,
        },
      },
    });
    return record;
  }
}
