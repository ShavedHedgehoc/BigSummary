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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocsListService = void 0;
const common_1 = require("@nestjs/common");
const docs_service_1 = require("../../../../../../../src/docs/docs.service");
const histories_service_1 = require("../../../../../../../src/histories/histories.service");
const records_service_1 = require("../../../../../../../src/records/records.service");
let DocsListService = class DocsListService {
    constructor(docsService, recordsService, historiesService) {
        this.docsService = docsService;
        this.recordsService = recordsService;
        this.historiesService = historiesService;
    }
    async getDocsList() {
        const docs = this.docsService.getAllDocs();
        const docsResult = await Promise.all((await docs).map(async (item) => {
            const records = await this.recordsService.getRecordsByDocId(item.id);
            const recordsCount = records.length;
            const historiesCounts = await Promise.all(await records.map(async (item) => {
                const count = await this.historiesService.getHistoriesCountByRecId(item.id);
                return count;
            }));
            const historiesCount = historiesCounts.reduce((a, b) => a + b, 0);
            return {
                id: item.id,
                date: item.date,
                plant: item.plants.value,
                recordsCount: recordsCount,
                historiesCount: historiesCount,
            };
        }));
        return docsResult;
    }
    async getDocsListWithFilter(dto) {
        const { total, rows } = await this.docsService.getAllDocsWithFilter(dto);
        const docsResult = await Promise.all((await rows).map(async (item) => {
            const records = await this.recordsService.getRecordsByDocId(item.id);
            const recordsCount = records.length;
            const historiesCounts = await Promise.all(await records.map(async (item) => {
                const count = await this.historiesService.getHistoriesCountByRecId(item.id);
                return count;
            }));
            const historiesCount = historiesCounts.reduce((a, b) => a + b, 0);
            return {
                id: item.id,
                date: item.date,
                plant: item.plants.value,
                recordsCount: recordsCount,
                historiesCount: historiesCount,
            };
        }));
        return { rows: docsResult, total: total };
    }
};
exports.DocsListService = DocsListService;
exports.DocsListService = DocsListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof docs_service_1.DocsService !== "undefined" && docs_service_1.DocsService) === "function" ? _a : Object, typeof (_b = typeof records_service_1.RecordsService !== "undefined" && records_service_1.RecordsService) === "function" ? _b : Object, typeof (_c = typeof histories_service_1.HistoriesService !== "undefined" && histories_service_1.HistoriesService) === "function" ? _c : Object])
], DocsListService);
//# sourceMappingURL=docs.list.service.js.map