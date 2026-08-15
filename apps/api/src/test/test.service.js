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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestService = void 0;
const common_1 = require("@nestjs/common");
const histories_service_1 = require("../../../../../../../src/histories/histories.service");
const records_service_1 = require("../../../../../../../src/records/records.service");
let TestService = class TestService {
    constructor(recordsService, historiesService) {
        this.recordsService = recordsService;
        this.historiesService = historiesService;
    }
    async getRecordDetail(id) {
        const record = await this.recordsService.getByIdWitDetailsNew(id);
        if (record) {
            const histories = await this.historiesService.getAllHistoriesByRecIdAndBoilId(id, record.boilId);
            const result = {
                ...JSON.parse(JSON.stringify(record)),
                histories: histories,
            };
            return result;
        }
        throw new common_1.HttpException("Запись в сводке не найдена", common_1.HttpStatus.NOT_FOUND);
    }
};
exports.TestService = TestService;
exports.TestService = TestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof records_service_1.RecordsService !== "undefined" && records_service_1.RecordsService) === "function" ? _a : Object, typeof (_b = typeof histories_service_1.HistoriesService !== "undefined" && histories_service_1.HistoriesService) === "function" ? _b : Object])
], TestService);
//# sourceMappingURL=test.service.js.map