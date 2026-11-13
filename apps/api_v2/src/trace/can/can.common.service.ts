// import { Injectable } from '@nestjs/common';
// import {
//   TApplicationTraceCanDataItem,
//   TApplicationTraceCanDataListResponse,
//   TDashTraceCanDataItem,
//   TDashTraceCanDataListResponse,
//   TGetTraceCanDataListInput,
//   TTraceCanVolumeListResponse,
// } from '@repo/schemas';
// import { mssqlPrisma, Prisma } from '@repo/db-mssql';

// const canWithRelationsInclude = {
//   CanRecords: {
//     include: {
//       CanStates: true,
//       Authors: true,
//       Batchs: {
//         include: {
//           BtProducts: {
//             include: {
//               Products: true,
//             },
//           },
//         },
//       },
//     },
//     orderBy: { CanRecordPK: 'desc' },
//   },
//   CanLocations: {
//     include: { Plants: true },
//     orderBy: { CanLocationPK: 'desc' },
//   },
// } satisfies Prisma.CansInclude;

// type TCanWithRelations = Prisma.CansGetPayload<{
//   include: typeof canWithRelationsInclude;
// }>;

// @Injectable()
// export class TraceCanCommonService {
//   private async getCanIdsByCanStateIds(typeArr: number[]): Promise<number[]> {
//     if (typeArr.length === 0) {
//       return [];
//     }

//     const maxCanRecordIdsGroup = await mssqlPrisma.canRecords.groupBy({
//       by: ['CanPK'],
//       _max: {
//         CanRecordPK: true,
//       },
//     });

//     const latestCanRecordsIds = maxCanRecordIdsGroup
//       .map((group) => group._max.CanRecordPK)
//       .filter((CanRecordPK): CanRecordPK is number => CanRecordPK !== null);

//     if (latestCanRecordsIds.length === 0) {
//       return [];
//     }
//     const validCans = await mssqlPrisma.canRecords.findMany({
//       where: {
//         CanRecordPK: { in: latestCanRecordsIds },
//         CanStatePK: { in: typeArr },
//       },
//       select: { CanPK: true },
//     });
//     return validCans.map((h) => h.CanPK);
//   }

//   private async getCanIdsByPlantIds(typeArr: number[]): Promise<number[]> {
//     if (typeArr.length === 0) {
//       return [];
//     }

//     const maxCanLocationIdsGroup = await mssqlPrisma.canLocations.groupBy({
//       by: ['CanPK'],
//       _max: {
//         CanLocationPK: true,
//       },
//     });

//     const latestCanLocationsIds = maxCanLocationIdsGroup
//       .map((group) => group._max.CanLocationPK)
//       .filter((CanLocationPK): CanLocationPK is number => CanLocationPK !== null);

//     if (latestCanLocationsIds.length === 0) {
//       return [];
//     }
//     const validCans = await mssqlPrisma.canLocations.findMany({
//       where: {
//         CanLocationPK: { in: latestCanLocationsIds },
//         PlantPK: { in: typeArr },
//       },
//       select: { CanPK: true },
//     });
//     return validCans.map((h) => h.CanPK);
//   }

//   private async getCanIdsByTransit(isTransit: boolean): Promise<number[]> {
//     const maxCanLocationIdsGroup = await mssqlPrisma.canLocations.groupBy({
//       by: ['CanPK'],
//       _max: { CanLocationPK: true },
//     });

//     const latestCanLocationsIds = maxCanLocationIdsGroup
//       .map((group) => group._max.CanLocationPK)
//       .filter((id): id is number => id !== null);

//     if (latestCanLocationsIds.length === 0) return [];

//     const validCans = await mssqlPrisma.canLocations.findMany({
//       where: {
//         CanLocationPK: { in: latestCanLocationsIds },
//         Transit: isTransit,
//       },
//       select: { CanPK: true },
//     });
//     return validCans.map((h) => h.CanPK);
//   }

//   private canResult(item: TCanWithRelations, includeRecords: true): TApplicationTraceCanDataItem;
//   private canResult(item: TCanWithRelations, includeRecords: false): TDashTraceCanDataItem;
//   private canResult(
//     item: TCanWithRelations,
//     includeRecords: boolean,
//   ): TApplicationTraceCanDataItem | TDashTraceCanDataItem {
//     const nowTime = Date.now();
//     const recordsCount = item.CanRecords.length;
//     const locationsCount = item.CanLocations.length;

//     const lastRecord = recordsCount > 0 ? item.CanRecords[0] : null;
//     const stateValue = lastRecord?.CanStates?.CanStateName ?? null;
//     const state = lastRecord?.CanStates?.CanStateDescription ?? null;
//     const stateTime = lastRecord?.CreateDate ?? null;
//     const isUpdated = stateTime ? nowTime - new Date(stateTime).getTime() < 1000 * 60 * 2 : false;
//     const baseContain = lastRecord?.Batchs?.BatchName ?? null;
//     const baseContainMarking =
//       lastRecord?.Batchs?.BtProducts?.[0]?.Products?.ProductMarking ?? null;
//     const author = lastRecord?.Authors?.AuthorName ?? null;

//     const lastLocation = locationsCount > 0 ? item.CanLocations[0] : null;
//     const transit = lastLocation?.Transit ?? null;
//     const plant = lastLocation?.Plants?.PlantAlias ?? null;

//     if (includeRecords) {
//       const states = [...item.CanRecords].slice(0, 20).map((record) => ({
//         state: record.CanStates?.CanStateDescription ?? null,
//         stateValue: record.CanStates?.CanStateName ?? null,
//         stateTime: record.CreateDate,
//         author: record.Authors?.AuthorName ?? null,
//         baseContain: record.Batchs?.BatchName ?? null,
//         baseContainMarking: record.Batchs?.BtProducts?.[0]?.Products?.ProductMarking ?? null,
//       }));
//       return {
//         id: item.CanPK,
//         name: item.CanName,
//         volume: item.CanVolume.toNumber(),
//         baseContain,
//         baseContainMarking,
//         stateValue,
//         state,
//         stateTime,
//         author,
//         isUpdated,
//         transit,
//         plant,
//         states,
//       };
//     }
//     return {
//       id: item.CanPK,
//       name: item.CanName,
//       volume: item.CanVolume.toNumber(),
//       baseContain,
//       baseContainMarking,
//       stateValue,
//       state,
//       stateTime,
//       author,
//       isUpdated,
//       transit,
//       plant,
//     };
//   }

//   async getCanDataList(
//     input: TGetTraceCanDataListInput & { includeRecords: true },
//   ): Promise<TApplicationTraceCanDataListResponse>;
//   async getCanDataList(
//     input: TGetTraceCanDataListInput & { includeRecords?: false },
//   ): Promise<TDashTraceCanDataListResponse>;
//   async getCanDataList(input: TGetTraceCanDataListInput & { includeRecords?: boolean }) {
//     const { can, states, plants, volumes, transit, includeRecords = false } = input;

//     const andConditions: Prisma.CansWhereInput[] = [];

//     if (can !== '') {
//       andConditions.push({ CanName: { contains: can } });
//     }

//     if (states && states.length > 0) {
//       const ids = await this.getCanIdsByCanStateIds(states);
//       if (ids.length === 0) {
//         return { rows: [], total: 0 };
//       }
//       andConditions.push({
//         CanPK: { in: ids },
//       });
//     }
//     if (plants && plants.length > 0) {
//       const ids = await this.getCanIdsByPlantIds(plants);
//       if (ids.length === 0) {
//         return { rows: [], total: 0 };
//       }
//       andConditions.push({
//         CanPK: { in: ids },
//       });
//     }

//     if (typeof transit === 'boolean') {
//       const ids = await this.getCanIdsByTransit(transit);
//       if (ids.length === 0) {
//         return { rows: [], total: 0 };
//       }
//       andConditions.push({ CanPK: { in: ids } });
//     }

//     if (volumes && volumes.length > 0) {
//       andConditions.push({
//         CanVolume: { in: volumes },
//       });
//     }
//     const cans = await mssqlPrisma.cans.findMany({
//       where: { AND: andConditions },
//       include: canWithRelationsInclude,
//       orderBy: {
//         CanOrderValue: 'asc',
//       },
//     });

//     if (includeRecords) {
//       const rows = cans.map((item) => this.canResult(item, true));
//       return { rows, total: rows.length };
//     }

//     const rows = cans.map((item) => this.canResult(item, false));
//     return { rows, total: rows.length };
//   }

//   async getCanVolumesList(): Promise<TTraceCanVolumeListResponse> {
//     const volumes = await mssqlPrisma.cans.findMany({
//       select: {
//         CanVolume: true,
//       },
//       distinct: ['CanVolume'],
//     });
//     return volumes.map((can) => ({ volume: can.CanVolume.toNumber() }));
//   }
// }
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

interface RawCanBaseRow {
  id: number;
  name: string;
  volume: number;
  baseContain: string | null;
  baseContainMarking: string | null;
  stateValue: string | null;
  state: string | null;
  stateTime: Date | null;
  author: string | null;
  transit: boolean | null;
  plant: string | null;
}

interface RawCanRecordRow {
  canId: number;
  state: string | null;
  stateValue: string | null;
  stateTime: Date | null;
  author: string | null;
  baseContain: string | null;
  baseContainMarking: string | null;
}

const TWO_MINUTES_MS = 1000 * 60 * 2;

@Injectable()
export class TraceCanCommonService {
  async getCanDataList(
    input: TGetTraceCanDataListInput & { includeRecords: true },
  ): Promise<TApplicationTraceCanDataListResponse>;
  async getCanDataList(
    input: TGetTraceCanDataListInput & { includeRecords?: false },
  ): Promise<TDashTraceCanDataListResponse>;
  async getCanDataList(
    input: TGetTraceCanDataListInput & { includeRecords?: boolean },
  ): Promise<TApplicationTraceCanDataListResponse | TDashTraceCanDataListResponse> {
    const { can, states, plants, volumes, transit, includeRecords = false } = input;

    // if (
    //   (states && states.length === 0) ||
    //   (plants && plants.length === 0) ||
    //   (volumes && volumes.length === 0)
    // ) {
    //   return { rows: [], total: 0 };
    // }

    const conditions: Prisma.Sql[] = [Prisma.sql`1 = 1`];

    if (can && can.trim() !== '') {
      conditions.push(Prisma.sql`c.CanName LIKE ${'%' + can + '%'}`);
    }

    if (volumes && volumes.length > 0) {
      conditions.push(Prisma.sql`c.CanVolume IN (${Prisma.join(volumes)})`);
    }

    if (states && states.length > 0) {
      conditions.push(Prisma.sql`lr.CanStatePK IN (${Prisma.join(states)})`);
    }

    if (plants && plants.length > 0) {
      conditions.push(Prisma.sql`ll.PlantPK IN (${Prisma.join(plants)})`);
    }

    if (typeof transit === 'boolean') {
      conditions.push(Prisma.sql`ll.Transit = ${transit ? 1 : 0}`);
    }

    const whereClause = Prisma.join(conditions, ' AND ');

    const baseQuery = Prisma.sql /* sql */ `
      WITH
        LatestRecords AS (
          SELECT
            cr.CanPK,
            cr.CanStatePK,
            cr.CreateDate,
            cr.AuthorPK,
            cr.BatchPK,
            ROW_NUMBER() OVER (
              PARTITION BY
                cr.CanPK
              ORDER BY
                cr.CanRecordPK DESC
            ) AS rn
          FROM
            CanRecords cr
        ),
        LatestLocations AS (
          SELECT
            cl.CanPK,
            cl.PlantPK,
            cl.Transit,
            ROW_NUMBER() OVER (
              PARTITION BY
                cl.CanPK
              ORDER BY
                cl.CanLocationPK DESC
            ) AS rn
          FROM
            CanLocations cl
        ),
        BatchProducts AS (
          SELECT
            bp.BatchPK,
            p.ProductMarking,
            ROW_NUMBER() OVER (
              PARTITION BY
                bp.BatchPK
              ORDER BY
                bp.BtProductPK ASC
            ) AS rn
          FROM
            BtProducts bp
            INNER JOIN Products p ON p.ProductId = bp.ProductId
        )
      SELECT
        c.CanPK AS id,
        c.CanName AS name,
        CAST(c.CanVolume AS FLOAT) AS volume,
        b.BatchName AS baseContain,
        bp.ProductMarking AS baseContainMarking,
        cs.CanStateName AS stateValue,
        cs.CanStateDescription AS state,
        lr.CreateDate AS stateTime,
        a.AuthorName AS author,
        CAST(ll.Transit AS BIT) AS transit,
        pl.PlantAlias AS plant
      FROM
        Cans c
        LEFT JOIN LatestRecords lr ON lr.CanPK = c.CanPK
        AND lr.rn = 1
        LEFT JOIN CanStates cs ON cs.CanStatePK = lr.CanStatePK
        LEFT JOIN Authors a ON a.AuthorPK = lr.AuthorPK
        LEFT JOIN Batchs b ON b.BatchPK = lr.BatchPK
        LEFT JOIN BatchProducts bp ON bp.BatchPK = lr.BatchPK
        AND bp.rn = 1
        LEFT JOIN LatestLocations ll ON ll.CanPK = c.CanPK
        AND ll.rn = 1
        LEFT JOIN Plants pl ON pl.PlantPK = ll.PlantPK
      WHERE
        ${whereClause}
      ORDER BY
        c.CanOrderValue ASC;
    `;

    const rawCans = await mssqlPrisma.$queryRaw<RawCanBaseRow[]>(baseQuery);

    if (rawCans.length === 0) {
      return { rows: [], total: 0 };
    }

    const nowTime = Date.now();

    const baseRows: TDashTraceCanDataItem[] = rawCans.map((row) => {
      const isUpdated = row.stateTime
        ? nowTime - new Date(row.stateTime).getTime() < TWO_MINUTES_MS
        : false;

      return {
        id: row.id,
        name: row.name,
        volume: Number(row.volume),
        baseContain: row.baseContain,
        baseContainMarking: row.baseContainMarking,
        stateValue: row.stateValue,
        state: row.state,
        stateTime: row.stateTime,
        author: row.author,
        isUpdated,
        transit: row.transit !== null ? Boolean(row.transit) : null,
        plant: row.plant,
      };
    });

    if (!includeRecords) {
      return { rows: baseRows, total: baseRows.length };
    }

    // Загружаем последние 20 записей истории только для найденных канистр
    const canIds = baseRows.map((row) => row.id);

    const recordsQuery = Prisma.sql /* sql */ `
      WITH
        RankedRecords AS (
          SELECT
            cr.CanPK AS canId,
            cr.CreateDate AS stateTime,
            cr.CanStatePK,
            cr.AuthorPK,
            cr.BatchPK,
            ROW_NUMBER() OVER (
              PARTITION BY
                cr.CanPK
              ORDER BY
                cr.CanRecordPK DESC
            ) AS rn
          FROM
            CanRecords cr
          WHERE
            cr.CanPK IN (${Prisma.join(canIds)})
        ),
        BatchProducts AS (
          SELECT
            bp.BatchPK,
            p.ProductMarking,
            ROW_NUMBER() OVER (
              PARTITION BY
                bp.BatchPK
              ORDER BY
                bp.BtProductPK ASC
            ) AS rn
          FROM
            BtProducts bp
            INNER JOIN Products p ON p.ProductId = bp.ProductId
        )
      SELECT
        rr.canId,
        cs.CanStateDescription AS state,
        cs.CanStateName AS stateValue,
        rr.stateTime,
        a.AuthorName AS author,
        b.BatchName AS baseContain,
        bp.ProductMarking AS baseContainMarking
      FROM
        RankedRecords rr
        LEFT JOIN CanStates cs ON cs.CanStatePK = rr.CanStatePK
        LEFT JOIN Authors a ON a.AuthorPK = rr.AuthorPK
        LEFT JOIN Batchs b ON b.BatchPK = rr.BatchPK
        LEFT JOIN BatchProducts bp ON bp.BatchPK = rr.BatchPK
        AND bp.rn = 1
      WHERE
        rr.rn <= 20
      ORDER BY
        rr.canId ASC,
        rr.rn ASC;
    `;

    const rawRecords = await mssqlPrisma.$queryRaw<RawCanRecordRow[]>(recordsQuery);

    const recordsByCanId = new Map<number, TApplicationTraceCanDataItem['states']>();
    for (const rec of rawRecords) {
      const list = recordsByCanId.get(rec.canId) ?? [];
      list.push({
        state: rec.state,
        stateValue: rec.stateValue,
        stateTime: rec.stateTime,
        author: rec.author,
        baseContain: rec.baseContain,
        baseContainMarking: rec.baseContainMarking,
      });
      recordsByCanId.set(rec.canId, list);
    }

    const detailedRows: TApplicationTraceCanDataItem[] = baseRows.map((row) => ({
      ...row,
      states: recordsByCanId.get(row.id) ?? [],
    }));

    return { rows: detailedRows, total: detailedRows.length };
  }

  async getCanVolumesList(): Promise<TTraceCanVolumeListResponse> {
    const query = Prisma.sql`
      SELECT DISTINCT
        CAST(CanVolume AS FLOAT) AS volume
      FROM Cans
      WHERE CanVolume IS NOT NULL
      ORDER BY volume ASC;
    `;

    const volumes = await mssqlPrisma.$queryRaw<{ volume: number }[]>(query);

    return volumes.map((item) => ({ volume: Number(item.volume) }));
  }
}
