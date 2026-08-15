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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraceInventoryDocsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const trace_inventory_docs_service_1 = require("./trace_inventory_docs.service");
const get_inventory_docs_dto_1 = require("./dto/get-inventory-docs.dto");
let TraceInventoryDocsController = class TraceInventoryDocsController {
    constructor(traceInventoryDocsService) {
        this.traceInventoryDocsService = traceInventoryDocsService;
    }
    getInventories(dto) {
        return this.traceInventoryDocsService.getInventoryDocs(dto);
    }
    getInventoryByid(inventory_id) {
        return this.traceInventoryDocsService.getInventoryById(Number(inventory_id));
    }
};
exports.TraceInventoryDocsController = TraceInventoryDocsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить документы инвентаризаций с фильтром" }),
    (0, common_1.Post)("/get-inventories"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_inventory_docs_dto_1.GetInventoryDocsDto]),
    __metadata("design:returntype", void 0)
], TraceInventoryDocsController.prototype, "getInventories", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить документ по id" }),
    (0, common_1.Get)("/:inventory_id"),
    __param(0, (0, common_1.Param)("inventory_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TraceInventoryDocsController.prototype, "getInventoryByid", null);
exports.TraceInventoryDocsController = TraceInventoryDocsController = __decorate([
    (0, swagger_1.ApiTags)("Документы инвентаризации на варочном"),
    (0, common_1.Controller)("trace-inventory-docs"),
    __metadata("design:paramtypes", [trace_inventory_docs_service_1.TraceInventoryDocsService])
], TraceInventoryDocsController);
//# sourceMappingURL=trace_inventory_docs.controller.js.map