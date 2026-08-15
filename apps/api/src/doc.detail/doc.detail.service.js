"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocDetailService = void 0;
const common_1 = require("@nestjs/common");
const docs_service_1 = require("../../../../../../../src/docs/docs.service");
const histories_service_1 = require("../../../../../../../src/histories/histories.service");
const records_service_1 = require("../../../../../../../src/records/records.service");
const semi_products_service_1 = require("../../../../../../../src/semi_products/semi_products.service");
const record_regulations_service_1 = require("../../../../../../../src/record_regulations/record_regulations.service");
const record_counters_service_1 = require("../../../../../../../src/record_counters/record_counters.service");
let DocDetailService = class DocDetailService {
    constructor(docsService, recordsService, historiesService, semiProductsService, recordRegulationsService, recordsCountersService) {
        this.docsService = docsService;
        this.recordsService = recordsService;
        this.historiesService = historiesService;
        this.semiProductsService = semiProductsService;
        this.recordRegulationsService = recordRegulationsService;
        this.recordsCountersService = recordsCountersService;
    }
    async recordResult(item) {
        const histories = await this.historiesService.getAllHistoriesByRecIdAndBoilId(item.id, item.water_base_id);
        const historiesCount = histories.length;
        const state = historiesCount > 0
            ? histories[histories.length - 1].historyType.description
            : "-";
        const stateValue = historiesCount > 0
            ? histories[histories.length - 1].historyType.value
            : null;
        const stateTime = historiesCount > 0 ? histories[histories.length - 1].createdAt : null;
        const isUpdated = stateTime
            ? new Date().getTime() - new Date(stateTime).getTime() < 1000 * 60 * 2
            : false;
        const semiProducts = await this.semiProductsService.getSemiProductsByRecordId(item.id);
        const regulation = await this.recordRegulationsService.getByRecordId(item.id);
        const doc = await item.$get("doc");
        const fact = await this.recordsCountersService.getTaskSum(item.id);
        const history_note = historiesCount > 0
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
            fact: fact,
            apparatus: item.apparatus ? item.apparatus.value : "-",
            bbf: item.bbf,
            dm: item.dm,
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
    async getDocDetailData(doc) {
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
    async getAppDocDetailData(doc) {
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
    async getDocDetailDataWithFilter(doc, dto) {
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
    async getDocRowDetailData(recordId) {
        const record = await this.recordsService.getRecordById(recordId);
        if (!record) {
            throw new common_1.HttpException("Запись на найдена", common_1.HttpStatus.NOT_FOUND);
        }
        const result = await this.recordResult(record);
        return result;
    }
    async getCurrentDocDetail(plantId) {
        const doc = await this.docsService.getCurrentDocByPlantId(plantId);
        if (!doc) {
            return { records: [] };
        }
        const result = await this.getDocDetailData(doc);
        return result;
    }
    async getTomorrowAppDocDetail(plantId) {
        const doc = await this.docsService.getTomorrowDocByPlantId(plantId);
        if (!doc) {
            return { records: [] };
        }
        const result = await this.getAppDocDetailData(doc);
        return result;
    }
    async getCurrentAppDocDetail(plantId) {
        const doc = await this.docsService.getCurrentDocByPlantId(plantId);
        if (!doc) {
            return { records: [] };
        }
        const result = await this.getDocDetailData(doc);
        return result;
    }
    async getDocDetailByDocId(docId) {
        const doc = await this.docsService.getDocById(docId);
        if (!doc) {
            throw new common_1.HttpException("Сводка на найдена", common_1.HttpStatus.NOT_FOUND);
        }
        const result = await this.getDocDetailData(doc);
        return result;
    }
    async getCurrentDocDetailWithFilter(dto) {
        const doc = await this.docsService.getCurrentDocByPlantId(dto.filter.plant);
        if (!doc) {
            return { records: [] };
        }
        const result = await this.getDocDetailDataWithFilter(doc, dto);
        return result;
    }
    async getDocDetailByIdWithFilter(dto) {
        const doc = await this.docsService.getDocById(Number(dto.doc_id));
        if (!doc) {
            return { records: [] };
        }
        const newDto = { filter: { ...dto.filter, plant: null } };
        const result = await this.getDocDetailDataWithFilter(doc, newDto);
        return result;
    }
    async getTimeReport(dto) {
        const doc = await this.docsService.getDocByPlantAndDate(dto.filter.date, dto.filter.plant);
        if (!doc) {
            return { records: [] };
        }
        const doc_recs = await this.recordsService.getRecordsByDocIdWithFilter(doc.id, dto);
        const recordsResult = await Promise.all(await doc_recs.map(async (item) => this.timeResult(item)));
        return recordsResult;
    }
    async timeResult(item) {
        const histories = await this.historiesService.getAllHistoriesByRecIdAndBoilId(item.id, item.water_base_id);
        const historiesCount = histories.length;
        const state = historiesCount > 0
            ? histories[histories.length - 1].historyType.description
            : "-";
        const stateValue = historiesCount > 0
            ? histories[histories.length - 1].historyType.value
            : null;
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
            lastProductInProgress: lastProductInProgress
                ? lastProductInProgress.createdAt
                : null,
            lastProductFinished: lastProductFinished
                ? lastProductFinished.createdAt
                : null,
        };
    }
};
exports.DocDetailService = DocDetailService;
exports.DocDetailService = DocDetailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof docs_service_1.DocsService !== "undefined" && docs_service_1.DocsService) === "function" ? _a : Object, typeof (_b = typeof records_service_1.RecordsService !== "undefined" && records_service_1.RecordsService) === "function" ? _b : Object, typeof (_c = typeof histories_service_1.HistoriesService !== "undefined" && histories_service_1.HistoriesService) === "function" ? _c : Object, typeof (_d = typeof semi_products_service_1.SemiProductsService !== "undefined" && semi_products_service_1.SemiProductsService) === "function" ? _d : Object, typeof (_e = typeof record_regulations_service_1.RecordRegulationsService !== "undefined" && record_regulations_service_1.RecordRegulationsService) === "function" ? _e : Object, typeof (_f = typeof record_counters_service_1.RecordCountersService !== "undefined" && record_counters_service_1.RecordCountersService) === "function" ? _f : Object])
], DocDetailService);
//# sourceMappingURL=doc.detail.service.js.map