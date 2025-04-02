import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import Doc from "src/docs/docs.model";
import { DocsService } from "src/docs/docs.service";
import { HistoriesService } from "src/histories/histories.service";
import Record from "src/records/records.model";
import { RecordsService } from "src/records/records.service";
import { GetCurrentDocDto } from "./dto/get-current-doc.dto";
import { GetDocByIdDto } from "./dto/get-doc-by-id.dto";
import { SemiProductsService } from "src/semi_products/semi_products.service";
import { RecordRegulationsService } from "src/record_regulations/record_regulations.service";
import { TimeReportDto } from "./dto/time-report.dto";

@Injectable()
export class DocDetailService {
  constructor(
    private docsService: DocsService,
    private recordsService: RecordsService,
    private historiesService: HistoriesService,
    private semiProductsService: SemiProductsService,
    private recordRegulationsService: RecordRegulationsService
  ) {}

  async recordResult<
    Type extends {
      id: number;
      productId: string;
      product: string;
      boil: string;
      plan: number;
      apparatus: string;
      bbf: string;
      note: string;
      can: string;
      conveyor: string;
      workshop: string;
      historiesCount: number;
      state: string;
      stateValue: string;
      isSet: boolean;
    },
  >(item: Record) {
    const histories = await this.historiesService.getAllHistoriesByRecIdAndBoilId(item.id, item.water_base_id);
    const historiesCount = histories.length;
    const state = historiesCount > 0 ? histories[histories.length - 1].historyType.description : "-";
    const stateValue = historiesCount > 0 ? histories[histories.length - 1].historyType.value : null;
    const stateTime = historiesCount > 0 ? histories[histories.length - 1].createdAt : null;
    const isUpdated = stateTime ? new Date().getTime() - new Date(stateTime).getTime() < 1000 * 60 * 2 : false;
    const semiProducts = await this.semiProductsService.getSemiProductsByRecordId(item.id);
    const regulation = await this.recordRegulationsService.getByRecordId(item.id);
    const doc = await item.$get("doc");

    const history_note =
      historiesCount > 0
        ? histories[histories.length - 1].history_note
          ? histories[histories.length - 1].history_note.value
          : null
        : null;

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
      stateTime: stateTime,
      isUpdated: isUpdated,
      isSet: item.isSet,
      semiProducts: semiProducts,
      regulation: regulation,
      water_base_id: item.water_base_id,
      plant_id: doc.plantId,
      history_note: history_note,
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
    const res = {
      ...JSON.parse(JSON.stringify(doc, replacer)),
      plant: doc.plants.value,
      records: [...recordsResult],
    };
    return res;
  }

  async getAppDocDetailData(doc: Doc) {
    const replacer = (key, value) => {
      if (key !== "plants") {
        return value;
      }
      return undefined;
    };

    const records = await this.recordsService.getAppRecordsByDocId(doc.id);

    const recordsResult = await Promise.all(await records.map(async (item) => this.recordResult(item)));
    const res = {
      ...JSON.parse(JSON.stringify(doc, replacer)),
      plant: doc.plants.value,
      records: [...recordsResult],
    };
    return res;
  }

  async getDocDetailDataWithFilter(doc: Doc, dto: GetCurrentDocDto) {
    const replacer = (key, value) => {
      if (key !== "plants") {
        return value;
      }
      return undefined;
    };

    const records = await this.recordsService.getRecordsByDocIdWithFilter(doc.id, dto);

    const recordsResult = await Promise.all(await records.map(async (item) => this.recordResult(item)));
    const res = {
      ...JSON.parse(JSON.stringify(doc, replacer)),
      plant: doc.plants.value,
      records: [...recordsResult],
    };
    return res;
  }

  async getDocRowDetailData(recordId: number) {
    const record = await this.recordsService.getRecordById(recordId);
    if (!record) {
      throw new HttpException("Запись на найдена", HttpStatus.NOT_FOUND);
    }
    const result = await this.recordResult(record);
    return result;
  }

  async getCurrentDocDetail(plantId: number) {
    const doc = await this.docsService.getCurrentDocByPlantId(plantId);
    if (!doc) {
      return { records: [] };
      // throw new HttpException("Сводка на найдена", HttpStatus.NOT_FOUND);
    }
    const result = await this.getDocDetailData(doc);
    return result;
  }

  async getTomorrowAppDocDetail(plantId: number) {
    const doc = await this.docsService.getTomorrowDocByPlantId(plantId);
    if (!doc) {
      return { records: [] };
      // throw new HttpException("Сводка на найдена", HttpStatus.NOT_FOUND);
    }
    const result = await this.getAppDocDetailData(doc);
    return result;
  }

  async getCurrentAppDocDetail(plantId: number) {
    const doc = await this.docsService.getCurrentDocByPlantId(plantId);
    if (!doc) {
      return { records: [] };
      // throw new HttpException("Сводка на найдена", HttpStatus.NOT_FOUND);
    }
    // const result = await this.getAppDocDetailData(doc);
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

  // async getCurrentDocDetailWithFilter(plantId: number, dto: GetCurrentDocDto) {
  async getCurrentDocDetailWithFilter(dto: GetCurrentDocDto) {
    const doc = await this.docsService.getCurrentDocByPlantId(dto.filter.plant);
    if (!doc) {
      return { records: [] };
    }
    const result = await this.getDocDetailDataWithFilter(doc, dto);
    return result;
  }

  async getDocDetailByIdWithFilter(dto: GetDocByIdDto) {
    const doc = await this.docsService.getDocById(Number(dto.doc_id));
    if (!doc) {
      return { records: [] };
    }
    const newDto: GetCurrentDocDto = { filter: { ...dto.filter, plant: null } };
    const result = await this.getDocDetailDataWithFilter(doc, newDto);
    return result;
  }

  async getTimeReport(dto: TimeReportDto) {
    const doc = await this.docsService.getDocByPlantAndDate(dto.filter.date, dto.filter.plant);
    if (!doc) {
      return { records: [] };
    }
    const doc_recs = await this.recordsService.getRecordsByDocIdWithFilter(doc.id, dto);
    const recordsResult = await Promise.all(await doc_recs.map(async (item) => this.timeResult(item)));
    return recordsResult;
  }

  async timeResult(item: Record) {
    const histories = await this.historiesService.getAllHistoriesByRecIdAndBoilId(item.id, item.water_base_id);
    const historiesCount = histories.length;
    const state = historiesCount > 0 ? histories[histories.length - 1].historyType.description : "-";
    const stateValue = historiesCount > 0 ? histories[histories.length - 1].historyType.value : null;
    const lastBaseCheck = await this.historiesService.getLastBaseCheck(item.water_base_id);
    const lastPlugPass = await this.historiesService.getLastPlugPass(item.water_base_id);
    const lastProductCheck = await this.historiesService.getLastProductCheck(item.id);
    const lastProductPass = await this.historiesService.getLastProductPass(item.id);
    const lastProductInProgress = await this.historiesService.getLastProductInProgress(item.id);
    const lastProductFinished = await this.historiesService.getLastProductFinished(item.id);

    return {
      id: item.id,
      state: state,
      stateValue: stateValue,
      conveyor: item.conveyor.value,
      productId: item.product.code1C,
      product: item.product.marking,
      boil: item.boil ? item.boil.value : "-",
      plan: item.plan,
      lastBaseCheck: lastBaseCheck ? lastBaseCheck.createdAt : null,
      lastPlugPass: lastPlugPass ? lastPlugPass.createdAt : null,
      lastProductCheck: lastProductCheck ? lastProductCheck.createdAt : null,
      lastProductPass: lastProductPass ? lastProductPass.createdAt : null,
      lastProductInProgress: lastProductInProgress ? lastProductInProgress.createdAt : null,
      lastProductFinished: lastProductFinished ? lastProductFinished.createdAt : null,
    };
  }
}
