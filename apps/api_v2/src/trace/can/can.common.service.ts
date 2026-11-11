import { Injectable } from '@nestjs/common';
import {
  TApplicationTraceCanDataItem,
  TApplicationTraceCanDataListResponse,
  TDashTraceCanDataItem,
  TDashTraceCanDataListResponse,
  TGetTraceCanDataListInput,
  TTraceCanVolumeListResponse,
} from '@repo/schemas';
import { mssqlPrisma, Prisma } from '@repo/db-mssql';

const canWithRelationsInclude = {
  CanRecords: {
    include: {
      CanStates: true,
      Authors: true,
      Batchs: {
        include: {
          BtProducts: {
            include: {
              Products: true,
            },
          },
        },
      },
    },
    orderBy: { CanRecordPK: 'desc' },
  },
  CanLocations: {
    include: { Plants: true },
    orderBy: { CanLocationPK: 'desc' },
  },
} satisfies Prisma.CansInclude;

type TCanWithRelations = Prisma.CansGetPayload<{
  include: typeof canWithRelationsInclude;
}>;

@Injectable()
export class TraceCanCommonService {
  private async getCanIdsByCanStateIds(typeArr: number[]): Promise<number[]> {
    if (typeArr.length === 0) {
      return [];
    }

    const maxCanRecordIdsGroup = await mssqlPrisma.canRecords.groupBy({
      by: ['CanPK'],
      _max: {
        CanRecordPK: true,
      },
    });

    const latestCanRecordsIds = maxCanRecordIdsGroup
      .map((group) => group._max.CanRecordPK)
      .filter((CanRecordPK): CanRecordPK is number => CanRecordPK !== null);

    if (latestCanRecordsIds.length === 0) {
      return [];
    }
    const validCans = await mssqlPrisma.canRecords.findMany({
      where: {
        CanRecordPK: { in: latestCanRecordsIds },
        CanStatePK: { in: typeArr },
      },
      select: { CanPK: true },
    });
    return validCans.map((h) => h.CanPK);
  }

  private async getCanIdsByPlantIds(typeArr: number[]): Promise<number[]> {
    if (typeArr.length === 0) {
      return [];
    }

    const maxCanLocationIdsGroup = await mssqlPrisma.canLocations.groupBy({
      by: ['CanPK'],
      _max: {
        CanLocationPK: true,
      },
    });

    const latestCanLocationsIds = maxCanLocationIdsGroup
      .map((group) => group._max.CanLocationPK)
      .filter((CanLocationPK): CanLocationPK is number => CanLocationPK !== null);

    if (latestCanLocationsIds.length === 0) {
      return [];
    }
    const validCans = await mssqlPrisma.canLocations.findMany({
      where: {
        CanLocationPK: { in: latestCanLocationsIds },
        PlantPK: { in: typeArr },
      },
      select: { CanPK: true },
    });
    return validCans.map((h) => h.CanPK);
  }

  private async getCanIdsByTransit(isTransit: boolean): Promise<number[]> {
    const maxCanLocationIdsGroup = await mssqlPrisma.canLocations.groupBy({
      by: ['CanPK'],
      _max: { CanLocationPK: true },
    });

    const latestCanLocationsIds = maxCanLocationIdsGroup
      .map((group) => group._max.CanLocationPK)
      .filter((id): id is number => id !== null);

    if (latestCanLocationsIds.length === 0) return [];

    const validCans = await mssqlPrisma.canLocations.findMany({
      where: {
        CanLocationPK: { in: latestCanLocationsIds },
        Transit: isTransit,
      },
      select: { CanPK: true },
    });
    return validCans.map((h) => h.CanPK);
  }

  private canResult(item: TCanWithRelations, includeRecords: true): TApplicationTraceCanDataItem;
  private canResult(item: TCanWithRelations, includeRecords: false): TDashTraceCanDataItem;
  private canResult(
    item: TCanWithRelations,
    includeRecords: boolean,
  ): TApplicationTraceCanDataItem | TDashTraceCanDataItem {
    const nowTime = Date.now();
    const recordsCount = item.CanRecords.length;
    const locationsCount = item.CanLocations.length;

    const lastRecord = recordsCount > 0 ? item.CanRecords[0] : null;
    const stateValue = lastRecord?.CanStates?.CanStateName ?? null;
    const state = lastRecord?.CanStates?.CanStateDescription ?? null;
    const stateTime = lastRecord?.CreateDate ?? null;
    const isUpdated = stateTime ? nowTime - new Date(stateTime).getTime() < 1000 * 60 * 2 : false;
    const baseContain = lastRecord?.Batchs?.BatchName ?? null;
    const baseContainMarking =
      lastRecord?.Batchs?.BtProducts?.[0]?.Products?.ProductMarking ?? null;
    const author = lastRecord?.Authors?.AuthorName ?? null;

    const lastLocation = locationsCount > 0 ? item.CanLocations[0] : null;
    const transit = lastLocation?.Transit ?? null;
    const plant = lastLocation?.Plants?.PlantAlias ?? null;

    if (includeRecords) {
      const states = [...item.CanRecords].slice(0, 20).map((record) => ({
        state: record.CanStates?.CanStateDescription ?? null,
        stateValue: record.CanStates?.CanStateName ?? null,
        stateTime: record.CreateDate,
        author: record.Authors?.AuthorName ?? null,
        baseContain: record.Batchs?.BatchName ?? null,
        baseContainMarking: record.Batchs?.BtProducts?.[0]?.Products?.ProductMarking ?? null,
      }));
      return {
        id: item.CanPK,
        name: item.CanName,
        volume: item.CanVolume.toNumber(),
        baseContain,
        baseContainMarking,
        stateValue,
        state,
        stateTime,
        author,
        isUpdated,
        transit,
        plant,
        states,
      };
    }
    return {
      id: item.CanPK,
      name: item.CanName,
      volume: item.CanVolume.toNumber(),
      baseContain,
      baseContainMarking,
      stateValue,
      state,
      stateTime,
      author,
      isUpdated,
      transit,
      plant,
    };
  }

  async getCanDataList(
    input: TGetTraceCanDataListInput & { includeRecords: true },
  ): Promise<TApplicationTraceCanDataListResponse>;
  async getCanDataList(
    input: TGetTraceCanDataListInput & { includeRecords?: false },
  ): Promise<TDashTraceCanDataListResponse>;
  async getCanDataList(input: TGetTraceCanDataListInput & { includeRecords?: boolean }) {
    const { can, states, plants, volumes, transit, includeRecords = false } = input;

    const andConditions: Prisma.CansWhereInput[] = [];

    if (can !== '') {
      andConditions.push({ CanName: { contains: can } });
    }

    if (states && states.length > 0) {
      const ids = await this.getCanIdsByCanStateIds(states);
      if (ids.length === 0) {
        return { rows: [], total: 0 };
      }
      andConditions.push({
        CanPK: { in: ids },
      });
    }
    if (plants && plants.length > 0) {
      const ids = await this.getCanIdsByPlantIds(plants);
      if (ids.length === 0) {
        return { rows: [], total: 0 };
      }
      andConditions.push({
        CanPK: { in: ids },
      });
    }

    if (typeof transit === 'boolean') {
      const ids = await this.getCanIdsByTransit(transit);
      if (ids.length === 0) {
        return { rows: [], total: 0 };
      }
      andConditions.push({ CanPK: { in: ids } });
    }

    if (volumes && volumes.length > 0) {
      andConditions.push({
        CanVolume: { in: volumes },
      });
    }
    const cans = await mssqlPrisma.cans.findMany({
      where: { AND: andConditions },
      include: canWithRelationsInclude,
      orderBy: {
        CanOrderValue: 'asc',
      },
    });

    if (includeRecords) {
      const rows = cans.map((item) => this.canResult(item, true));
      return { rows, total: rows.length };
    }

    const rows = cans.map((item) => this.canResult(item, false));
    return { rows, total: rows.length };
  }

  async getCanVolumesList(): Promise<TTraceCanVolumeListResponse> {
    const volumes = await mssqlPrisma.cans.findMany({
      select: {
        CanVolume: true,
      },
      distinct: ['CanVolume'],
    });
    return volumes.map((can) => ({ volume: can.CanVolume.toNumber() }));
  }
}
