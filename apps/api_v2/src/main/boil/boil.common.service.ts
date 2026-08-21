import { Injectable } from '@nestjs/common';
import { pgPrisma, Prisma } from '@repo/db-postgres';
import { TBoilDetailResponse, TBoilListResponse, TGetBoilListInput } from '@repo/schemas';

const boilWithRelationsInclude = {
  bases: true,
  plants: true,
  records: true,
  histories: {
    include: {
      history_types: true,
    },
    orderBy: {
      id: 'asc',
    },
  },
} as const;

type TBoilWithRelations = Prisma.boilsGetPayload<{
  include: typeof boilWithRelationsInclude;
}>;

@Injectable()
export class BoilCommonService {
  private boilResult(item: TBoilWithRelations): TBoilDetailResponse {
    const recordsCount = item.records.length;
    const historiesCount = item.histories.length;
    const lastHistory = historiesCount > 0 ? item.histories[item.histories.length - 1] : null;
    const state = lastHistory ? lastHistory.history_types.description : '-';
    const stateValue = lastHistory ? lastHistory.history_types.value : null;
    const stateId = lastHistory ? lastHistory.history_types.id : null;

    return {
      id: item.id,
      value: item.value,
      base_code: item.bases?.code ?? null,
      base_marking: item.bases?.marking ?? null,
      recordsCount: recordsCount,
      historiesCount: historiesCount,
      state: state,
      state_id: stateId,
      stateValue: stateValue,
      plant: item.plants?.abb ?? null,
    };
  }

  private async getBoilsIdsByHistoryTypeIds(typeArr: number[]): Promise<number[]> {
    if (typeArr.length === 0) {
      return [];
    }

    const maxHistoryIdsGroup = await pgPrisma.histories.groupBy({
      by: ['boil_id'],
      _max: {
        id: true,
      },
    });

    const latestHistoryIds = maxHistoryIdsGroup
      .map((group) => group._max.id)
      .filter((id): id is number => id !== null);

    if (latestHistoryIds.length === 0) {
      return [];
    }
    const validHistories = await pgPrisma.histories.findMany({
      where: {
        id: { in: latestHistoryIds },
        historyTypeId: { in: typeArr },
      },
      select: { boil_id: true },
    });
    return validHistories.map((h) => h.boil_id);
  }

  async getBoilList(input: TGetBoilListInput): Promise<TBoilListResponse> {
    const { filter, limit, page } = input;
    const andConditions: Prisma.boilsWhereInput[] = [];
    if (filter.baseCode !== '') {
      andConditions.push({
        bases: { code: { contains: filter.baseCode, mode: 'insensitive' } },
      });
    }

    if (filter.boil !== '') {
      andConditions.push({
        value: { contains: filter.boil },
      });
    }

    if (filter.marking !== '') {
      andConditions.push({
        bases: { marking: { contains: filter.marking, mode: 'insensitive' } },
      });
    }

    if (filter.plants && filter.plants.length > 0) {
      andConditions.push({
        plant_id: { in: filter.plants },
      });
    }

    if (filter.states && filter.states.length > 0) {
      const ids = await this.getBoilsIdsByHistoryTypeIds(filter.states);
      andConditions.push({
        id: { in: ids },
      });
    }

    if (filter.haveRecord) {
      andConditions.push({
        histories: { some: {} },
      });
    }

    const direction = filter.boilAsc ? 'asc' : ('desc' as 'asc' | 'desc');

    const orderBy = [{ year: direction }, { letter: direction }, { number: direction }];

    const [items, total] = await Promise.all([
      pgPrisma.boils.findMany({
        where: { AND: andConditions },
        include: boilWithRelationsInclude,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: orderBy,
      }),
      pgPrisma.boils.count({
        where: { AND: andConditions },
      }),
    ]);

    const rows = items.map((item) => this.boilResult(item));
    return { rows, total };
  }
}
