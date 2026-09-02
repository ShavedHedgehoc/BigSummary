import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { pgPrisma, Prisma } from '@repo/db-postgres';
import {
  TCreateWorkstationHistoryInput,
  TGetWorkstationHistoryListInput,
  TWorkstationCreateHistoryResponse,
  TWorkstationHistoryListResponse,
} from '@repo/schemas';
import { IWorkstationHistoryService } from '@repo/trpc';
import { HistoryCommonService } from './history.common.service';

const historiesdWithRelationsInclude = {
  employees: true,
  history_types: true,
  boils: {
    include: {
      bases: true,
    },
  },
  records: {
    include: {
      products: true,
      boils: true,
    },
  },
} satisfies Prisma.historiesInclude;

type THistoriesWithRelations = Prisma.historiesGetPayload<{
  include: typeof historiesdWithRelationsInclude;
}>;

@Injectable()
export class WorkstationHistoryService implements IWorkstationHistoryService {
  constructor(
    @Inject(forwardRef(() => HistoryCommonService))
    private historyCommonService: HistoryCommonService,
  ) {}

  async getLastEmployeeHistoriesByPlantId(
    input: TGetWorkstationHistoryListInput,
  ): Promise<TWorkstationHistoryListResponse> {
    const { plantId, limit } = input;
    const items = await pgPrisma.histories.findMany({
      where: {
        employeeId: { not: null },
        plant_id: plantId,
      },
      include: historiesdWithRelationsInclude,
      orderBy: { createdAt: 'desc' },
      take: limit ?? 10,
    });
    if (items.length === 0) return null;
    const histories = items.map((item: THistoriesWithRelations) => ({
      id: item.id,
      createdAt: item.createdAt,
      boil: item.records ? item.records?.boils?.value : (item.boils?.value ?? null),
      product: item.records?.products?.marking ?? null,
      base: item.boils?.bases?.marking ?? null,
      historyType: item.history_types?.description,
      employee: item.employees?.name ?? null,
    }));
    return histories;
  }

  async createHistory(
    input: TCreateWorkstationHistoryInput,
  ): Promise<TWorkstationCreateHistoryResponse> {
    return this.historyCommonService.createHistory(input);
  }
}
