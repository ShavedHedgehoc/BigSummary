import { Injectable } from '@nestjs/common';
import { mssqlPrisma, Prisma } from '@repo/db-mssql';
import {
  TDashTraceCanRecordItem,
  TDashTraceCanRecordListResponse,
  TGetDashTraceCanRecordListInput,
} from '@repo/schemas';
import { TRPCError } from '@trpc/server';

const canRecordWithRelationsInclude = {
  CanStates: true,
  Batchs: true,
  Authors: true,
} satisfies Prisma.CanRecordsInclude;

type TCanRecordWithRelations = Prisma.CanRecordsGetPayload<{
  include: typeof canRecordWithRelationsInclude;
}>;

@Injectable()
export class TraceCanRecordCommonService {
  async getLastCanRecordListByCanId(
    input: TGetDashTraceCanRecordListInput,
  ): Promise<TDashTraceCanRecordListResponse> {
    const { canId, limit } = input;
    const can = await mssqlPrisma.cans.findUnique({
      where: { CanPK: canId },
    });
    if (!can) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Емкость с id ${canId} не найдена`,
      });
    }
    const items = await mssqlPrisma.canRecords.findMany({
      where: { CanPK: canId },
      include: canRecordWithRelationsInclude,
      orderBy: { CreateDate: 'desc' },
      take: limit ?? 10,
    });
    const records: TDashTraceCanRecordItem[] = items.map((item: TCanRecordWithRelations) => ({
      CreateDate: item.CreateDate,
      stateDescription: item.CanStates?.CanStateDescription ?? null,
      authorName: item.Authors?.AuthorName ?? null,
      baseContain: item.Batchs?.BatchName ?? null,
    }));
    return records;
  }
}
