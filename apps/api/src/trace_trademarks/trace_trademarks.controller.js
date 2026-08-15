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
exports.TraceTrademarksController = void 0;
const common_1 = require("@nestjs/common");
const trace_trademarks_service_1 = require("./trace_trademarks.service");
const swagger_1 = require("@nestjs/swagger");
const get_trace_trademarks_dto_1 = require("./dto/get-trace-trademarks.dto");
let TraceTrademarksController = class TraceTrademarksController {
    constructor(traceTrademarksService) {
        this.traceTrademarksService = traceTrademarksService;
    }
    getInventories(dto) {
        return this.traceTrademarksService.getTrademarks(dto);
    }
};
exports.TraceTrademarksController = TraceTrademarksController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить торговые названия с фильтром" }),
    (0, common_1.Post)("/"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_trace_trademarks_dto_1.GetTraceTrademarksDto]),
    __metadata("design:returntype", void 0)
], TraceTrademarksController.prototype, "getInventories", null);
exports.TraceTrademarksController = TraceTrademarksController = __decorate([
    (0, swagger_1.ApiTags)("Торговые названия"),
    (0, common_1.Controller)("trace-trademarks"),
    __metadata("design:paramtypes", [trace_trademarks_service_1.TraceTrademarksService])
], TraceTrademarksController);
//# sourceMappingURL=trace_trademarks.controller.js.map