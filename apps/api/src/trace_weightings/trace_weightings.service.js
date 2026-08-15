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
exports.TraceWeightingsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const trace_weighting_model_1 = __importDefault(require("../trace_models/trace_weighting.model"));
let TraceWeightingsService = class TraceWeightingsService {
    constructor(traceWeightingRepository) {
        this.traceWeightingRepository = traceWeightingRepository;
    }
    async weightingResult(item) {
        const product = await item.$get("product");
        const container = await item.$get("container");
        const lot = await item.$get("lot");
        const trademark = await lot.$get("trademark");
        const document = await item.$get("document");
        const user = await document.$get("author");
        const itemResult = {
            id: item.WeightingsPK,
            product_id: item.ProductId,
            product_name: product.ProductName ? product.ProductName : null,
            quantity: item.Quantity,
            container_id: container.ContainerPK,
            container_name: container.ContainerName,
            lot_id: lot.LotPK,
            lot: lot.LotName,
            trademark: trademark ? trademark.TrademarkName : null,
            user: user.AuthorName,
            date: new Date(document.CreateDate.setHours(document.CreateDate.getHours() + 3)),
        };
        return itemResult;
    }
    async getWeightingsRows(batchPK) {
        const weightings = await this.traceWeightingRepository.findAll({
            where: { BatchPK: batchPK },
        });
        return await Promise.all(await weightings.map((item) => this.weightingResult(item)));
    }
};
exports.TraceWeightingsService = TraceWeightingsService;
exports.TraceWeightingsService = TraceWeightingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(trace_weighting_model_1.default, "trace_connection")),
    __metadata("design:paramtypes", [Object])
], TraceWeightingsService);
//# sourceMappingURL=trace_weightings.service.js.map