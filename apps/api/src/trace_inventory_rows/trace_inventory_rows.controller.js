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
exports.TraceInventoryRowsController = void 0;
const common_1 = require("@nestjs/common");
const trace_inventory_rows_service_1 = require("./trace_inventory_rows.service");
const get_inventory_rows_by_id_with_filter_dto_1 = require("./dto/get-inventory-rows-by-id-with-filter.dto");
const swagger_1 = require("@nestjs/swagger");
let TraceInventoryRowsController = class TraceInventoryRowsController {
    constructor(inventoryRowsService) {
        this.inventoryRowsService = inventoryRowsService;
    }
    getInventoryRowsByIdWithFilter(dto) {
        return this.inventoryRowsService.getInventoryByIdWithFilter(dto);
    }
};
exports.TraceInventoryRowsController = TraceInventoryRowsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить строки переучета по id документа" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_inventory_rows_by_id_with_filter_dto_1.GetInventoryRowsByIdWithFilterDto]),
    __metadata("design:returntype", void 0)
], TraceInventoryRowsController.prototype, "getInventoryRowsByIdWithFilter", null);
exports.TraceInventoryRowsController = TraceInventoryRowsController = __decorate([
    (0, swagger_1.ApiTags)("Строки переучета"),
    (0, common_1.Controller)("trace-inventory-rows"),
    __metadata("design:paramtypes", [trace_inventory_rows_service_1.TraceInventoryRowsService])
], TraceInventoryRowsController);
//# sourceMappingURL=trace_inventory_rows.controller.js.map