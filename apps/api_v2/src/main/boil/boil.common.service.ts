import { Injectable } from '@nestjs/common';
import { pgPrisma, Prisma } from '@repo/db-postgres';
import {
  TApplicationBoilItem,
  TApplicationBoilListResponse,
  TBoilDetailResponse,
  TBoilListResponse,
  TGetBoilListInput,
} from '@repo/schemas';

const boilWithRelationsInclude = {
  bases: true,
  plants: true,
  records: true,
  histories: {
    include: {
      employees: true,
      history_types: true,
      notes: true,
      users: true,
    },
    orderBy: {
      id: 'asc',
    },
  },
} satisfies Prisma.boilsInclude;

type TBoilWithRelations = Prisma.boilsGetPayload<{
  include: typeof boilWithRelationsInclude;
}>;

type TBoilRowResult<T extends boolean> = T extends true
  ? TApplicationBoilItem
  : TBoilDetailResponse;
type TBoilListResult<T extends boolean> = T extends true
  ? TApplicationBoilListResponse
  : TBoilListResponse;

@Injectable()
export class BoilCommonService {
  private boilResult<T extends boolean>(
    item: TBoilWithRelations,
    includeHistories: T,
  ): TBoilRowResult<T> {
    const recordsCount = item.records.length;
    const historiesCount = item.histories.length;
    const lastHistory = historiesCount > 0 ? item.histories[item.histories.length - 1] : null;
    const state = lastHistory ? lastHistory.history_types.description : '-';
    const stateValue = lastHistory ? lastHistory.history_types.value : null;
    const stateId = lastHistory ? lastHistory.history_types.id : null;

    if (includeHistories) {
      return {
        id: item.id,
        boilValue: item.value,
        baseCode: item.bases?.code ?? null,
        baseMarking: item.bases?.marking ?? null,
        recordsCount,
        historiesCount,
        state,
        stateId,
        stateValue,
        plant: item.plants?.abb ?? null,
        histories: item.histories.map((h) => ({
          id: h.id,
          value: h.history_types?.value ?? null,
          description: h.history_types?.description ?? null,
          note: h.note,
          history_note: h.notes?.value ?? null,
          employee: h.employees?.name ?? null,
          user: h.users?.name ?? null,
          createdAt: h.createdAt,
        })),
      } as TBoilRowResult<T>;
    }
    return {
      id: item.id,
      value: item.value,
      base_code: item.bases?.code ?? null,
      base_marking: item.bases?.marking ?? null,
      recordsCount,
      historiesCount,
      state,
      state_id: stateId,
      stateValue,
      plant: item.plants?.abb ?? null,
    } as TBoilRowResult<T>;
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

  async getBoilList<T extends boolean = false>(
    input: TGetBoilListInput & { includeHistories?: T },
  ): Promise<TBoilListResult<T>> {
    const { filter, limit, page, includeHistories = false as T } = input;
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

    // const rows = items.map((item) => this.boilResult(item));
    // return { rows, total };
    const rows = items.map((item) => this.boilResult(item, includeHistories));
    if (includeHistories) {
      const totalPages = Math.ceil(total / limit);
      return { rows, total, totalPages } as unknown as TBoilListResult<T>;
    }

    return { rows, total } as unknown as TBoilListResult<T>;
  }
}
