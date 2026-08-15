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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoilsListService = void 0;
const common_1 = require("@nestjs/common");
const bases_service_1 = require("../../../../../../../src/bases/bases.service");
const boils_service_1 = require("../../../../../../../src/boils/boils.service");
const histories_service_1 = require("../../../../../../../src/histories/histories.service");
const records_service_1 = require("../../../../../../../src/records/records.service");
const plants_service_1 = require("../../../../../../../src/plants/plants.service");
let BoilsListService = class BoilsListService {
    constructor(boilsService, recordsService, historiesService, basesService, plantService) {
        this.boilsService = boilsService;
        this.recordsService = recordsService;
        this.historiesService = historiesService;
        this.basesService = basesService;
        this.plantService = plantService;
    }
    async getBoilListRowData(item) {
        function replacer(key, value) {
            if (key !== "records" && key !== "histories") {
                return value;
            }
            return undefined;
        }
        const records = await this.recordsService.getRecordsByBoilId(item.id);
        const histories = await this.historiesService.getHistoriesByBoilId(item.id);
        const recordsCount = records.length;
        const historiesCount = histories.length;
        const state = historiesCount > 0
            ? histories[histories.length - 1].historyType.description
            : "-";
        const state_id = historiesCount > 0
            ? histories[histories.length - 1].historyType.id
            : null;
        const stateValue = historiesCount > 0
            ? histories[histories.length - 1].historyType.value
            : null;
        const base = await this.basesService.getByid(item.base_id);
        const plant = await this.plantService.getPlantByPk(item.plant_id);
        return {
            ...JSON.parse(JSON.stringify(item, replacer)),
            base_code: base ? base.code : null,
            base_marking: base ? base.marking : null,
            recordsCount: recordsCount,
            historiesCount: historiesCount,
            state: state,
            state_id: state_id,
            stateValue: stateValue,
            plant: plant ? plant.abb : null,
        };
    }
    async getBoilReportRowData(item) {
        function replacer(key, value) {
            if (key !== "records" && key !== "histories") {
                return value;
            }
            return undefined;
        }
        const records = await this.recordsService.getRecordsByBoilId(item.id);
        const histories = await this.historiesService.getHistoriesByBoilId(item.id);
        const firstBaseCheck = await this.historiesService.getFirstBaseCheck(item.id);
        const lastBaseCheck = await this.historiesService.getLastBaseCheck(item.id);
        const lastPlugPass = await this.historiesService.getLastPlugPass(item.id);
        const recordsCount = records.length;
        const historiesCount = histories.length;
        const state = historiesCount > 0
            ? histories[histories.length - 1].historyType.description
            : "-";
        const state_id = historiesCount > 0
            ? histories[histories.length - 1].historyType.id
            : null;
        const stateValue = historiesCount > 0
            ? histories[histories.length - 1].historyType.value
            : null;
        const base = await this.basesService.getByid(item.base_id);
        const plant = await this.plantService.getPlantByPk(item.plant_id);
        const firstBaseCheckTime = firstBaseCheck ? firstBaseCheck.createdAt : null;
        const lastBaseCheckTime = lastBaseCheck ? lastBaseCheck.createdAt : null;
        const lastPlugPassTime = lastPlugPass ? lastPlugPass.createdAt : null;
        return {
            ...JSON.parse(JSON.stringify(item, replacer)),
            base_code: base ? base.code : null,
            base_marking: base ? base.marking : null,
            recordsCount: recordsCount,
            historiesCount: historiesCount,
            state: state,
            state_id: state_id,
            stateValue: stateValue,
            plant: plant ? plant.abb : null,
            firstBaseCheckTime: firstBaseCheckTime,
            lastBaseCheckTime: lastBaseCheckTime,
            lastPlugPassTime: lastPlugPassTime,
        };
    }
    async getBoilsList() {
        const boils = await this.boilsService.getAllBoils();
        const result = await Promise.all(await boils.map((item) => this.getBoilListRowData(item)));
        return result;
    }
    async getBoilsListWithFilter(dto) {
        const { boils, count } = await this.boilsService.getBoilsWithFilter(dto);
        const result = await Promise.all(await boils.map((item) => this.getBoilListRowData(item)));
        return { rows: result, total: count };
    }
    async getBoilsReportWithFilter(dto) {
        const { boils, count } = await this.boilsService.getBoilsWithFilter(dto);
        const result = await Promise.all(await boils.map((item) => this.getBoilReportRowData(item)));
        return { rows: result, total: count };
    }
    async getBoilsListRow(boilId) {
        const boil = await this.boilsService.getBoilListRow(boilId);
        return await this.getBoilListRowData(boil);
    }
};
exports.BoilsListService = BoilsListService;
exports.BoilsListService = BoilsListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof boils_service_1.BoilsService !== "undefined" && boils_service_1.BoilsService) === "function" ? _a : Object, typeof (_b = typeof records_service_1.RecordsService !== "undefined" && records_service_1.RecordsService) === "function" ? _b : Object, typeof (_c = typeof histories_service_1.HistoriesService !== "undefined" && histories_service_1.HistoriesService) === "function" ? _c : Object, typeof (_d = typeof bases_service_1.BasesService !== "undefined" && bases_service_1.BasesService) === "function" ? _d : Object, typeof (_e = typeof plants_service_1.PlantsService !== "undefined" && plants_service_1.PlantsService) === "function" ? _e : Object])
], BoilsListService);
//# sourceMappingURL=boils.list.service.js.map