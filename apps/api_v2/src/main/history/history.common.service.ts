import { Injectable } from '@nestjs/common';
import { pgPrisma, Prisma } from '@repo/db-postgres';

const historyWithRelationsInclude = {
  history_types: true,
  users: true,
  employees: true,
  notes: true,
} as const;

export type THistoryWithRelations = Prisma.historiesGetPayload<{
  include: typeof historyWithRelationsInclude;
}>;

@Injectable()
export class HistoryCommonService {
  async getAllHistoriesByRecIdAndBoilId(
    recordId: number,
    boilId: number | null,
  ): Promise<THistoryWithRelations[]> {
    const histories = await pgPrisma.histories.findMany({
      where: boilId
        ? { OR: [{ record_id: recordId }, { boil_id: boilId }] }
        : { record_id: recordId },
      include: historyWithRelationsInclude,
      orderBy: { createdAt: 'asc' },
    });
    return histories;
  }

  async getHistoriesByBoilId(boilId: number): Promise<THistoryWithRelations[]> {
    const histories = await pgPrisma.histories.findMany({
      where: { boil_id: boilId },
      include: historyWithRelationsInclude,
      orderBy: { createdAt: 'asc' },
    });
    return histories;
  }
}
