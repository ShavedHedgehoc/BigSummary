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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraceTechnologyService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const trace_loads_service_1 = require("../../../../../../../src/trace_loads/trace_loads.service");
const trace_boil_record_model_1 = __importDefault(require("../../../../../../../src/trace_models/trace_boil_record.model"));
let TraceTechnologyService = class TraceTechnologyService {
    constructor(traceBoilRecordRepository, traceLoadService) {
        this.traceBoilRecordRepository = traceBoilRecordRepository;
        this.traceLoadService = traceLoadService;
    }
    async technologyResult(item) {
        const operation = await item.$get("operation");
        const author = await item.$get("author");
        const itemResult = {
            operation_code: operation.OperationCode,
            operation_name: operation.OperationName,
            quantity: null,
            lot_name: null,
            temperature: item.Temperature,
            user: author.AuthorName,
            date: new Date(item.CreateDate.setHours(item.CreateDate.getHours() + 3)),
        };
        return itemResult;
    }
    async getTechnologyRows(batchPK) {
        const technologies = await this.traceBoilRecordRepository.findAll({
            where: { BatchId: batchPK },
            order: [["CreateDate", "ASC"]],
        });
        return await Promise.all(await technologies.map((item) => this.technologyResult(item)));
    }
    async getBoilCard(batchPK) {
        const tech_rows = await this.getTechnologyRows(batchPK);
        const load_rows = await this.traceLoadService.getLoadsRowsForTechnology(batchPK);
        return [...tech_rows, ...load_rows].sort((a, b) => a.date > b.date ? 1 : b.date > a.date ? -1 : 0);
    }
};
exports.TraceTechnologyService = TraceTechnologyService;
exports.TraceTechnologyService = TraceTechnologyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(trace_boil_record_model_1.default, "trace_connection")),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof trace_loads_service_1.TraceLoadsService !== "undefined" && trace_loads_service_1.TraceLoadsService) === "function" ? _a : Object])
], TraceTechnologyService);
//# sourceMappingURL=trace_technology.service.js.map