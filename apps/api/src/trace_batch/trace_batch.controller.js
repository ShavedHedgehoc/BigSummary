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
exports.TraceBatchController = void 0;
const common_1 = require("@nestjs/common");
const trace_batch_service_1 = require("./trace_batch.service");
const swagger_1 = require("@nestjs/swagger");
const get_trace_batchs_dto_1 = require("./dto/get-trace-batchs.dto");
const get_trace_batchs_wght_report_dto_1 = require("./dto/get-trace-batchs-wght-report.dto");
const get_batchs_wght_report_detail_dto_1 = require("./dto/get-batchs-wght-report-detail.dto");
const get_weightings_summary_dto_1 = require("./dto/get-weightings-summary.dto");
const get_weightings_summary_detail_dto_1 = require("./dto/get-weightings-summary-detail.dto");
let TraceBatchController = class TraceBatchController {
    constructor(traceBatchService) {
        this.traceBatchService = traceBatchService;
    }
    getTraceBatchByName(batchName) {
        return this.traceBatchService.getByName(batchName);
    }
    getTraceBatchByid(id) {
        return this.traceBatchService.getById(Number(id));
    }
    getBatchesWithFilter(dto) {
        return this.traceBatchService.getBatchs(dto);
    }
    getWghtReport(dto) {
        return this.traceBatchService.getBatchsWghtReport(dto);
    }
    getWghtReportDetail(dto) {
        return this.traceBatchService.getBatchsWghtReportDetail(dto);
    }
    getBatchВфефByid(id) {
        return this.traceBatchService.getBatchData(Number(id));
    }
    deleteConveyorById(id) {
        return this.traceBatchService.deleteWeightingsByContainerId(Number(id));
    }
    getWeightingDepartmentSummary(dto) {
        return this.traceBatchService.getWeightingDepartmentSummary(dto);
    }
    getWeightingDepartmentSummaryDetail(dto) {
        return this.traceBatchService.getWeightingsDepartmentsSummaryDetail(dto);
    }
};
exports.TraceBatchController = TraceBatchController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить партию из прослеживаемости по имени" }),
    (0, swagger_1.ApiOkResponse)({
        description: "Партия варки, полученная по имени",
        schema: {
            properties: {
                BatchPK: {
                    description: "id варки",
                    example: 180547,
                    type: "number",
                },
                BatchName: {
                    description: "Партия варки",
                    example: "93A3",
                    type: "string",
                },
                BatchDate: {
                    description: "Дата варки",
                    example: "2023-01-10T00:00:00.000Z",
                    type: "date",
                },
                Plant: {
                    description: "Первая буква площадки",
                    example: "К",
                    type: "string",
                },
            },
        },
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: "Партия не найдена",
    }),
    (0, common_1.Get)("/:batchName"),
    __param(0, (0, common_1.Param)("batchName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TraceBatchController.prototype, "getTraceBatchByName", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить партию из прослеживаемости по id" }),
    (0, common_1.Get)("/by_id/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TraceBatchController.prototype, "getTraceBatchByid", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить варки с фильтром" }),
    (0, common_1.Post)("/"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_trace_batchs_dto_1.GetTraceBatchsDto]),
    __metadata("design:returntype", void 0)
], TraceBatchController.prototype, "getBatchesWithFilter", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Отчет по взвешиваниям" }),
    (0, common_1.Post)("/wght-report"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_trace_batchs_wght_report_dto_1.GetTraceBatchsWghtReportDto]),
    __metadata("design:returntype", void 0)
], TraceBatchController.prototype, "getWghtReport", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "Отчет по взвешиваниям, детально по варке и продукту",
    }),
    (0, common_1.Post)("/wght-report-detail"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_batchs_wght_report_detail_dto_1.GetTraceBatchsWghtReportDetailDto]),
    __metadata("design:returntype", void 0)
], TraceBatchController.prototype, "getWghtReportDetail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить варки по id" }),
    (0, common_1.Get)("/detail/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TraceBatchController.prototype, "getBatch\u0412\u0444\u0435\u0444Byid", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Удалить взвешивания по id контейнера" }),
    (0, swagger_1.ApiResponse)({ status: 201 }),
    (0, common_1.Delete)("/delete_by_container/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TraceBatchController.prototype, "deleteConveyorById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить сводку по весовому участку" }),
    (0, common_1.Post)("/weightings_department_summary"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_weightings_summary_dto_1.GetWeightingsSummaryDto]),
    __metadata("design:returntype", void 0)
], TraceBatchController.prototype, "getWeightingDepartmentSummary", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить детальную сводку по весовому участку" }),
    (0, common_1.Post)("/weightings_department_summary_detail"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_weightings_summary_detail_dto_1.GetWeightingsSummaryDetailDto]),
    __metadata("design:returntype", void 0)
], TraceBatchController.prototype, "getWeightingDepartmentSummaryDetail", null);
exports.TraceBatchController = TraceBatchController = __decorate([
    (0, swagger_1.ApiTags)("Варки (для теста)"),
    (0, common_1.Controller)("trace-batch"),
    __metadata("design:paramtypes", [trace_batch_service_1.TraceBatchService])
], TraceBatchController);
//# sourceMappingURL=trace_batch.controller.js.map