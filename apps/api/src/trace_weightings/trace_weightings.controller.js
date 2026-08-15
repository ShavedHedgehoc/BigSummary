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
exports.TraceWeightingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const trace_weightings_service_1 = require("./trace_weightings.service");
let TraceWeightingsController = class TraceWeightingsController {
    constructor(traceWeightingService) {
        this.traceWeightingService = traceWeightingService;
    }
    getWeightingsRows(batchPK) {
        return this.traceWeightingService.getWeightingsRows(Number(batchPK));
    }
};
exports.TraceWeightingsController = TraceWeightingsController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "Получить строки взвешиваний из прослеживаемости по id партии",
    }),
    (0, common_1.Get)("/:batchPK"),
    __param(0, (0, common_1.Param)("batchPK")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TraceWeightingsController.prototype, "getWeightingsRows", null);
exports.TraceWeightingsController = TraceWeightingsController = __decorate([
    (0, swagger_1.ApiTags)("Взвешивания (для теста)"),
    (0, common_1.Controller)("trace-weightings"),
    __metadata("design:paramtypes", [trace_weightings_service_1.TraceWeightingsService])
], TraceWeightingsController);
//# sourceMappingURL=trace_weightings.controller.js.map