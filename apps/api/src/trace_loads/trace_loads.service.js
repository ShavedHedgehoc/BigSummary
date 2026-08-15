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
exports.TraceLoadsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const trace_loads_model_1 = __importDefault(require("../../../../../../../src/trace_models/trace_loads.model"));
let TraceLoadsService = class TraceLoadsService {
    constructor(traceLoadRepository) {
        this.traceLoadRepository = traceLoadRepository;
    }
    async parseWeightings(w_item, l_item) {
        const container = await l_item.$get("container");
        const product = await w_item.$get("product");
        const lot = await w_item.$get("lot");
        const trademark = await lot.$get("trademark");
        const document = await l_item.$get("document");
        const user = await document.$get("author");
        return {
            id: l_item.LoadsPK,
            product_id: product.ProductId,
            product_name: product.ProductName,
            quantity: w_item.Quantity,
            container_id: container.ContainerPK,
            container_name: container.ContainerName,
            lot_id: lot.LotPK,
            lot: lot.LotName,
            trademark: trademark ? trademark.TrademarkName : null,
            user: user.AuthorName,
            date: new Date(document.CreateDate.setHours(document.CreateDate.getHours() + 3)),
        };
    }
    async parseWeightingsForTechnology(w_item, l_item) {
        const container = await l_item.$get("container");
        const product = await w_item.$get("product");
        const lot = await w_item.$get("lot");
        const trademark = await lot.$get("trademark");
        const document = await l_item.$get("document");
        const user = await document.$get("author");
        return {
            operation_code: product.ProductId,
            operation_name: product.ProductName,
            quantity: w_item.Quantity,
            lot_name: lot.LotName,
            temperature: null,
            user: user.AuthorName,
            date: new Date(document.CreateDate.setHours(document.CreateDate.getHours() + 3)),
        };
    }
    async loadResult(item) {
        const container = await item.$get("container");
        const weightings = await container.$get("weightings");
        return await Promise.all(await weightings.map((w_item) => this.parseWeightings(w_item, item)));
    }
    async loadForTechnologyResult(item) {
        const container = await item.$get("container");
        const weightings = await container.$get("weightings");
        return await Promise.all(await weightings.map((w_item) => this.parseWeightingsForTechnology(w_item, item)));
    }
    async getLoadsRows(batchPK) {
        const loads = await this.traceLoadRepository.findAll({
            where: { BatchPK: batchPK },
        });
        const result = await Promise.all(await loads.map((item) => this.loadResult(item)));
        return result.flat(1);
    }
    async getLoadsRowsForTechnology(batchPK) {
        const loads = await this.traceLoadRepository.findAll({
            where: { BatchPK: batchPK },
        });
        const result = await Promise.all(await loads.map((item) => this.loadResult(item)));
        return result.flat(1);
    }
};
exports.TraceLoadsService = TraceLoadsService;
exports.TraceLoadsService = TraceLoadsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(trace_loads_model_1.default, "trace_connection")),
    __metadata("design:paramtypes", [Object])
], TraceLoadsService);
//# sourceMappingURL=trace_loads.service.js.map