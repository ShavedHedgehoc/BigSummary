import { Injectable } from '@nestjs/common';
import { pgPrisma, Prisma } from '@repo/db-postgres';

const recordWithRelationsInclude = {
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
}
