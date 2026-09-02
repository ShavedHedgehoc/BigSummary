import { Injectable } from '@nestjs/common';
import {
  TDashTraceCanDataItem,
  TDashTraceCanDataListResponse,
  TDashTraceCanVolumeListResponse,
  TGetDashTraceCanDataListInput,
} from '@repo/schemas';
import { CanRecords, mssqlPrisma, Prisma } from '@repo/db-mssql';

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
  },
  CanLocations: {
    include: { Plants: true },
  },
} satisfies Prisma.CansInclude;

type TCanWithRelations = Prisma.CansGetPayload<{
  include: typeof canWithRelationsInclude;
}>;

const offset = 3;

@Injectable()
export class TraceCanCommonService {
  private isUpdated(state: CanRecords) {
    return (
      new Date().getTime() - (new Date(state.CreateDate).getTime() - offset * 3600 * 1000) <
      1000 * 60 * 2
    );
  }

  private stateTime(state: CanRecords) {
    return new Date(new Date(state.CreateDate).getTime() - offset * 3600 * 1000);
  }

  private async getCanIdsByStateTypeIds(typeArr: number[]): Promise<number[]> {
    if (typeArr.length === 0) {
      return [];
    }

    const maxRecordsGroup = await mssqlPrisma.canRecords.groupBy({
      by: ['CanPK'],
      _max: {
        CanRecordPK: true,
      },
    });

    const latestRecordsPKs = maxRecordsGroup
      .map((group) => group._max.CanRecordPK)
      .filter((id): id is number => id !== null && id !== undefined);

    if (latestRecordsPKs.length === 0) {
      return [];
    }
    const validRecords = await mssqlPrisma.canRecords.findMany({
      where: {
        CanRecordPK: { in: latestRecordsPKs },
        CanStatePK: { in: typeArr },
      },
      select: { CanPK: true },
    });
    return validRecords.map((h) => h.CanPK);
  }

  private async getCanIdsByPlantIds(typeArr: number[]): Promise<number[]> {
    if (typeArr.length === 0) {
      return [];
    }

    const maxLocationsGroup = await mssqlPrisma.canLocations.groupBy({
      by: ['CanPK'],
      _max: {
        CanLocationPK: true,
      },
    });

    const latestLocationsPKs = maxLocationsGroup
      .map((group) => group._max.CanLocationPK)
      .filter((id): id is number => id !== null && id !== undefined);

    if (latestLocationsPKs.length === 0) {
      return [];
    }
    const validLocations = await mssqlPrisma.canLocations.findMany({
      where: {
        CanLocationPK: { in: latestLocationsPKs },
        PlantPK: { in: typeArr },
      },
      select: { CanPK: true },
    });
    return validLocations.map((h) => h.CanPK);
  }

  private async getCansIdsInTransit(condition: boolean): Promise<number[]> {
    const maxLocationsGroup = await mssqlPrisma.canLocations.groupBy({
      by: ['CanPK'],
      _max: {
        CanLocationPK: true,
      },
    });
    const latestLocationsPKs = maxLocationsGroup
      .map((group) => group._max.CanLocationPK)
      .filter((id): id is number => id !== null && id !== undefined);

    if (latestLocationsPKs.length === 0) {
      return [];
    }

    const validLocations = await mssqlPrisma.canLocations.findMany({
      where: {
        CanLocationPK: { in: latestLocationsPKs },
        Transit: condition,
      },
      select: { CanPK: true },
    });

    return validLocations.map((l) => l.CanPK);
  }

  private canResult(item: TCanWithRelations): TDashTraceCanDataItem {
    const recordsCount = item.CanRecords.length;
    const locationsCount = item.CanLocations.length;
    const lastRecord = recordsCount > 0 ? item.CanRecords[item.CanRecords.length - 1] : null;
    const lastLocation =
      locationsCount > 0 ? item.CanLocations[item.CanLocations.length - 1] : null;
    return {
      id: item.CanPK,
      name: item.CanName,
      volume: item.CanVolume.toNumber(),
      baseContain: lastRecord?.Batchs?.BatchName ?? null,
      baseContainMarking: lastRecord?.Batchs?.BtProducts?.[0]?.Products?.ProductMarking ?? null,
      stateValue: lastRecord?.CanStates?.CanStateName ?? '-',
      state: lastRecord?.CanStates?.CanStateDescription ?? '-',
      stateTime: lastRecord ? this.stateTime(lastRecord) : null,
      author: lastRecord?.Authors?.AuthorName ?? null,
      isUpdated: lastRecord ? this.isUpdated(lastRecord) : false,
      plant: lastLocation?.Plants?.PlantName ?? null,
      transit: lastLocation?.Transit ?? false,
    };
  }

  async getCanVolumesList(): Promise<TDashTraceCanVolumeListResponse> {
    const volumes = await mssqlPrisma.cans.findMany({
      select: {
        CanVolume: true,
      },
      distinct: ['CanVolume'],
    });
    return volumes.map((can) => ({ volume: can.CanVolume.toNumber() }));
  }

  async getCanDataList(
    input: TGetDashTraceCanDataListInput,
  ): Promise<TDashTraceCanDataListResponse> {
    const { filter } = input;
    const andConditions: Prisma.CansWhereInput[] = [];
    if (filter.can !== '') {
      andConditions.push({
        CanName: { contains: filter.can },
      });
    }
    if (filter.volumes && filter.volumes.length > 0) {
      andConditions.push({
        CanVolume: { in: filter.volumes },
      });
    }
    if (filter.states && filter.states.length > 0) {
      const idss = await this.getCanIdsByStateTypeIds(filter.states);
      andConditions.push({
        CanPK: { in: idss },
      });
    }
    if (filter.plants && filter.plants.length > 0) {
      const idsp = await this.getCanIdsByPlantIds(filter.plants);
      andConditions.push({
        CanPK: { in: idsp },
      });
    }
    const idst = await this.getCansIdsInTransit(filter.transit);
    andConditions.push({
      CanPK: { in: idst },
    });

    const items = (await mssqlPrisma.cans.findMany({
      where: { AND: andConditions },
      include: canWithRelationsInclude,
      orderBy: { CanOrderValue: 'asc' },
    })) as TCanWithRelations[];

    return items.map((item) => this.canResult(item));
  }
}
