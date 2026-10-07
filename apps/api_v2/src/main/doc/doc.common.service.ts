import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { docs, pgPrisma } from '@repo/db-postgres';
import { TDocDetailResponse, TRecordDetailResponse } from '@repo/schemas';
import {
  RecordCommonService,
  recordWithRelationsInclude,
  TRecordWithRelations,
} from '../record/record.common.service';
import { HistoryCommonService } from '../history/history.common.service';
import { RecordCounterService } from '../record-counter/record-counter.service';
import { SemiProductCommonService } from '../semi-product/semi-product.common.service';
import { RegulationCommonService } from '../regulation/regulation.common.service';
import { TRPCError } from '@trpc/server';

@Injectable()
export class DocCommonService {
  constructor(
    @Inject(forwardRef(() => RecordCommonService))
    private recordCommonService: RecordCommonService,
    @Inject(forwardRef(() => HistoryCommonService))
    private historyCommonService: HistoryCommonService,
    @Inject(forwardRef(() => RecordCounterService))
    private recordCounterService: RecordCounterService,
    @Inject(forwardRef(() => SemiProductCommonService))
    private semiProductService: SemiProductCommonService,
    @Inject(forwardRef(() => RegulationCommonService))
    private regulationCommonService: RegulationCommonService,
  ) {}

  private async recordResult(
    item: TRecordWithRelations,
    plantId: number,
  ): Promise<TRecordDetailResponse> {
    const [histories, fact, semiProducts, regulation] = await Promise.all([
      this.historyCommonService.getAllHistoriesByRecIdAndBoilId(item.id, item.water_base_id),
      this.recordCounterService.getTaskSum(item.id),
      this.semiProductService.getSemiProductsByRecordId(item.id),
      this.regulationCommonService.getRegulationByRecordId(item.id),
    ]);

    const historiesCount = histories.length;
    const lastHistory = historiesCount > 0 ? histories[histories.length - 1] : null;
    const history_note = lastHistory?.notes?.value ?? null;
    const state = lastHistory ? lastHistory.history_types.description : '-';
    const stateValue = lastHistory ? lastHistory.history_types.value : null;
    const stateTime = lastHistory ? lastHistory.createdAt : null;

    const isUpdated = stateTime
      ? new Date().getTime() - new Date(stateTime).getTime() < 1000 * 60 * 2
      : false;
    return {
      id: item.id,
      productId: item.products.code1C,
      product: item.products.marking,
      boil: item.boils ? item.boils.value : '-',
      plan: item.plan,
      fact: fact,
      apparatus: item.apparatuses ? item.apparatuses.value : '-',
      bbf: item.bbf,
      dm: item.dm,
      note: item.note,
      can: item.cans ? item.cans.value : '-',
      conveyor: item.conveyors.value,
      workshop: item.workshops.value,
      historiesCount: historiesCount,
      state: state,
      stateValue: stateValue,
      stateTime: stateTime,
      isSet: item.isSet,
      isUpdated: isUpdated,
      semiProducts: semiProducts,
      regulation: regulation,
      water_base_id: item.water_base_id,
      plant_id: plantId,
      history_note: history_note,
    };
  }

  async getDocDetailData(doc: docs): Promise<TDocDetailResponse> {
    const plant = await pgPrisma.plants.findUnique({
      where: { id: doc.plantId },
    });

    const recordsData = await this.recordCommonService.getRecordsByDocId(doc.id);
    const recordIds = recordsData.map((r) => r.id);

    if (recordsData.length === 0) {
      return {
        id: doc.id,
        plantId: doc.plantId,
        date: doc.date,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
        plant: plant?.value ?? null,
        records: [],
      };
    }

    const [allHistoriesGrouped, allFactsMap, allSemiProductsGrouped, allRegulationsMap] =
      await Promise.all([
        this.historyCommonService.getHistoriesForRecords(
          recordsData.map((r) => ({ id: r.id, water_base_id: r.water_base_id })),
        ),
        this.recordCounterService.getTaskSumsForRecordIds(recordIds),
        this.semiProductService.getSemiProductsByRecordIds(recordIds),
        this.regulationCommonService.getRegulationsByRecordIds(recordIds),
      ]);

    const nowTime = Date.now();
    const recordsResult: TRecordDetailResponse[] = recordsData.map((item) => {
      const histories = allHistoriesGrouped[item.id] ?? [];
      const fact = allFactsMap[item.id] ?? 0;
      const semiProducts = allSemiProductsGrouped[item.id] ?? [];
      const regulation = allRegulationsMap[item.id] ?? null;

      const historiesCount = histories.length;
      const lastHistory = historiesCount > 0 ? histories[histories.length - 1] : null;
      const history_note = lastHistory?.notes?.value ?? null;
      const state = lastHistory ? lastHistory.history_types.description : '-';
      const stateValue = lastHistory ? lastHistory.history_types.value : null;
      const stateTime = lastHistory ? lastHistory.createdAt : null;

      const isUpdated = stateTime ? nowTime - new Date(stateTime).getTime() < 1000 * 60 * 2 : false;

      return {
        id: item.id,
        productId: item.products.code1C,
        product: item.products.marking,
        boil: item.boils ? item.boils.value : '-',
        plan: item.plan,
        fact: fact,
        apparatus: item.apparatuses ? item.apparatuses.value : '-',
        bbf: item.bbf,
        dm: item.dm,
        note: item.note,
        can: item.cans ? item.cans.value : '-',
        conveyor: item.conveyors.value,
        workshop: item.workshops.value,
        historiesCount: historiesCount,
        state: state,
        stateValue: stateValue,
        stateTime: stateTime,
        isSet: item.isSet,
        isUpdated: isUpdated,
        semiProducts: semiProducts,
        regulation: regulation,
        water_base_id: item.water_base_id,
        plant_id: doc.plantId,
        history_note: history_note,
      };
    });

    return {
      id: doc.id,
      plantId: doc.plantId,
      date: doc.date,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      plant: plant?.value ?? null,
      records: recordsResult,
    };
  }

  async getDocDetailRow(recordId: number): Promise<TRecordDetailResponse> {
    const record = await pgPrisma.records.findUnique({
      where: { id: recordId },
      include: {
        ...recordWithRelationsInclude,
        docs: true,
      },
    });

    if (!record) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Запись не найдена',
      });
    }

    if (!record.docs) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Связанный документ для записи ID ${recordId} не найден в системе`,
      });
    }
    const result = await this.recordResult(record, record.docs.plantId);
    return result;
  }

  async getCurrentDocByPlantId(plantId: number): Promise<docs> {
    const moscowDateStr = new Date().toLocaleDateString('en-CA', {
      timeZone: 'Europe/Moscow',
    });

    const startOfDay = new Date(`${moscowDateStr}T00:00:00+03:00`);
    const endOfDay = new Date(`${moscowDateStr}T23:59:59.999+03:00`);

    const doc = await pgPrisma.docs.findFirst({
      where: {
        plantId: plantId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return doc;
  }

  async getTomorrowDocByPlantId(plantId: number): Promise<docs> {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const moscowTomorrowStr = tomorrow.toLocaleDateString('en-CA', {
      timeZone: 'Europe/Moscow',
    });

    const startOfTomorrow = new Date(`${moscowTomorrowStr}T00:00:00+03:00`);
    const endOfTomorrow = new Date(`${moscowTomorrowStr}T23:59:59.999+03:00`);

    const doc = await pgPrisma.docs.findFirst({
      where: {
        plantId: plantId,
        date: {
          gte: startOfTomorrow,
          lte: endOfTomorrow,
        },
      },
    });
    return doc;
  }
}
