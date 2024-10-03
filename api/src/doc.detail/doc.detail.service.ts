import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import Doc from "src/docs/docs.model";
import { DocsService } from "src/docs/docs.service";
import { HistoriesService } from "src/histories/histories.service";
import Record from "src/records/records.model";
import { RecordsService } from "src/records/records.service";

@Injectable()
export class DocDetailService {
  constructor(
    private docsService: DocsService,
    private recordsService: RecordsService,
    private historiesService: HistoriesService
  ) {}

  async recordResult(item: Record) {
    const histories = await this.historiesService.getAllHistoriesByRecIdAndBoilId(item.id, item.boilId);
    const historiesCount = histories.length;
    const state = historiesCount > 0 ? histories[histories.length - 1].historyType.description : "-";
    const stateValue = historiesCount > 0 ? histories[histories.length - 1].historyType.value : null;
    return {
      id: item.id,
      productId: item.product.code1C,
      product: item.product.marking,
      boil: item.boil ? item.boil.value : "-",
      plan: item.plan,
      apparatus: item.apparatus ? item.apparatus.value : "-",
      bbf: item.bbf,
      note: item.note,
      can: item.can ? item.can.value : "-",
      conveyor: item.conveyor.value,
      workshop: item.workshop.value,
      historiesCount: historiesCount,
      state: state,
      stateValue: stateValue,
    };
  }

  async getDocDetailData(doc: Doc) {
    const replacer = (key, value) => {
      if (key !== "plants") {
        return value;
      }
      return undefined;
    };
    const records = await this.recordsService.getRecordsByDocId(doc.id);
    const recordsResult = await Promise.all(await records.map(async (item) => this.recordResult(item)));
    return { ...JSON.parse(JSON.stringify(doc, replacer)), plant: doc.plants.value, records: [...recordsResult] };
  }

  async getDocRowDetailData(recordId: number) {
    const record = await this.recordsService.getRecordById(recordId);
    if (!record) {
      throw new HttpException("Запись на найдена", HttpStatus.NOT_FOUND);
    }
    return await this.recordResult(record);
  }

  async getCurrentDocDetail(plantId: number) {
    const doc = await this.docsService.getCurrentDocByPlantId(plantId);
    if (!doc) {
      throw new HttpException("Сводка на найдена", HttpStatus.NOT_FOUND);
    }
    const result = await this.getDocDetailData(doc);
    return result;
  }

  async getDocDetailByDocId(docId: number) {
    const doc = await this.docsService.getDocById(docId);
    if (!doc) {
      throw new HttpException("Сводка на найдена", HttpStatus.NOT_FOUND);
    }
    const result = await this.getDocDetailData(doc);
    return result;
  }
}
