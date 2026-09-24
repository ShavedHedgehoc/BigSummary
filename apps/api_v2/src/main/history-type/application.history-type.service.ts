import { Injectable } from '@nestjs/common';
import { pgPrisma } from '@repo/db-postgres';
import { TApplicationHistoryTypeListResponse } from '@repo/schemas';
import { IApplicationHistoryTypeService } from '@repo/trpc';

@Injectable()
export class ApplicationHistoryTypeService implements IApplicationHistoryTypeService {
  async getAllHistoryTypeList(): Promise<TApplicationHistoryTypeListResponse> {
    const historyTypes = await pgPrisma.history_types.findMany();
    return historyTypes;
  }
  async getBoilHistoryTypeList(): Promise<TApplicationHistoryTypeListResponse> {
    const historyTypes = await pgPrisma.history_types.findMany({
      where: { for_boil: true },
    });
    return historyTypes;
  }
  async getProductHistoryTypeList(): Promise<TApplicationHistoryTypeListResponse> {
    const historyTypes = await pgPrisma.history_types.findMany({
      where: { for_boil: false },
    });
    return historyTypes;
  }
}
