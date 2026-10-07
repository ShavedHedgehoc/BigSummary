import { Injectable } from '@nestjs/common';
import { pgPrisma } from '@repo/db-postgres';
import { historyStatusSchema, TApplicationHistoryTypeListResponse } from '@repo/schemas';
import { IApplicationHistoryTypeService } from '@repo/trpc';

@Injectable()
export class ApplicationHistoryTypeService implements IApplicationHistoryTypeService {
  async getAllHistoryTypeList(): Promise<TApplicationHistoryTypeListResponse> {
    const result = await pgPrisma.history_types.findMany();
    return result.map((item) => {
      const parsedValue = historyStatusSchema.catch('base_fail').parse(item.value);
      return {
        id: item.id,
        description: item.description,
        for_boil: item.for_boil,
        value: parsedValue,
      };
    });
  }

  async getBoilHistoryTypeList(): Promise<TApplicationHistoryTypeListResponse> {
    const result = await pgPrisma.history_types.findMany({
      where: { for_boil: true },
    });
    return result.map((item) => {
      const parsedValue = historyStatusSchema.catch('base_fail').parse(item.value);
      return {
        id: item.id,
        description: item.description,
        for_boil: item.for_boil,
        value: parsedValue,
      };
    });
  }

  async getProductHistoryTypeList(): Promise<TApplicationHistoryTypeListResponse> {
    const result = await pgPrisma.history_types.findMany({
      where: { for_boil: false },
    });
    return result.map((item) => {
      const parsedValue = historyStatusSchema.catch('base_fail').parse(item.value);
      return {
        id: item.id,
        description: item.description,
        for_boil: item.for_boil,
        value: parsedValue,
      };
    });
  }
}
