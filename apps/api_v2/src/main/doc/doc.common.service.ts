import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { docs, pgPrisma } from '@repo/db-postgres';
import { TDocDetailResponse, TRecordDetailResponse } from '@repo/schemas';
import { RecordCommonService, TRecordWithRelations } from '../record/record.common.service';
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
  ) { }

  private async recordResult(
    item: TRecordWithRelations,
    plantId: number,
  ): Promise<TRecordDetailResponse> {
    // type from schemas here
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
    const recordsResult = await Promise.all(
      recordsData.map((item) => this.recordResult(item, doc.plantId)),
    );

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
    const record = await this.recordCommonService.getRecordById(recordId);
    if (!record) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Запись на найдена',
      });
    }
    const doc = await pgPrisma.docs.findUnique({ where: { id: record.doc_id } });
    if (!doc) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Связанный документ с ID ${record.doc_id} не найден в системе`,
      });
    }
    const result = await this.recordResult(record, doc.plantId);
    return result;
  }

  async getCurrentDocByPlantId(plantId: number): Promise<docs> {
    const offset = 3;
    const date = new Date(
      new Date(new Date().getTime() + offset * 3600 * 1000).setHours(12, 0, 0, 0),
    );
    const doc = await pgPrisma.docs.findFirst({
      where: {
        plantId: plantId,
        date: date,
      },
    });
    return doc;
  }

  async getTomorrowDocByPlantId(plantId: number): Promise<docs> {
    const offset = 3 + 24;
    const date = new Date(
      new Date(new Date().getTime() + offset * 3600 * 1000).setHours(12, 0, 0, 0),
    );
    const doc = await pgPrisma.docs.findFirst({
      where: {
        plantId: plantId,
        date: date,
      },
    });
    return doc;
  }
}
