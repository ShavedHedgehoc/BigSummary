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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraceCanRecordsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const trace_author_model_1 = __importDefault(require("../../../../../../../src/trace_models/trace_author.model"));
const trace_batch_model_1 = __importDefault(require("../../../../../../../src/trace_models/trace_batch.model"));
const trace_can_record_model_1 = __importDefault(require("../../../../../../../src/trace_models/trace_can_record.model"));
const trace_can_state_model_1 = __importDefault(require("../../../../../../../src/trace_models/trace_can_state.model"));
let TraceCanRecordsService = class TraceCanRecordsService {
    constructor(traceCanRecordsRepository) {
        this.traceCanRecordsRepository = traceCanRecordsRepository;
    }
    async getLastStateById(id) {
        const state = await this.traceCanRecordsRepository.findOne({
            where: { CanPK: id },
            order: [["CreateDate", "DESC"]],
        });
        return state;
    }
    async getLastTenRecordsById(id) {
        const states = await this.traceCanRecordsRepository.findAll({
            attributes: {
                exclude: ["CanPK", "AuthorPK", "BatchPK", "CanStatePK"],
                include: [
                    [(0, sequelize_2.col)("state.CanStateDescription"), "stateDescription"],
                    [(0, sequelize_2.col)("author.AuthorName"), "authorName"],
                    [(0, sequelize_2.col)("batch.BatchName"), "baseContain"],
                ],
            },
            include: [
                {
                    model: trace_can_state_model_1.default,
                    as: "state",
                    attributes: [],
                },
                {
                    model: trace_batch_model_1.default,
                    as: "batch",
                    attributes: [],
                },
                {
                    model: trace_author_model_1.default,
                    as: "author",
                    attributes: [],
                },
            ],
            where: { CanPK: id },
            order: [["CreateDate", "DESC"]],
            limit: 10,
        });
        return states;
    }
};
exports.TraceCanRecordsService = TraceCanRecordsService;
exports.TraceCanRecordsService = TraceCanRecordsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(trace_can_record_model_1.default, "trace_connection")),
    __metadata("design:paramtypes", [Object])
], TraceCanRecordsService);
//# sourceMappingURL=trace_can_records.service.js.map