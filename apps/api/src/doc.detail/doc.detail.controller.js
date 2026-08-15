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
exports.DocDetailController = void 0;
const common_1 = require("@nestjs/common");
const doc_detail_service_1 = require("./doc.detail.service");
const swagger_1 = require("@nestjs/swagger");
const get_current_doc_dto_1 = require("./dto/get-current-doc.dto");
const get_doc_by_id_dto_1 = require("./dto/get-doc-by-id.dto");
const time_report_dto_1 = require("./dto/time-report.dto");
let DocDetailController = class DocDetailController {
    constructor(docDetailService) {
        this.docDetailService = docDetailService;
    }
    getCurrentDocDetail(plantId) {
        return this.docDetailService.getCurrentDocDetail(Number(plantId));
    }
    getCurrentAppDocDetail(plantId) {
        return this.docDetailService.getCurrentAppDocDetail(Number(plantId));
    }
    getTomorrowAppDocDetail(plantId) {
        return this.docDetailService.getTomorrowAppDocDetail(Number(plantId));
    }
    getDocDetailByDocId(doc_id) {
        return this.docDetailService.getDocDetailByDocId(Number(doc_id));
    }
    getRecordDetail(record_id) {
        return this.docDetailService.getDocRowDetailData(Number(record_id));
    }
    getCurrentDocWithParams(dto) {
        return this.docDetailService.getCurrentDocDetailWithFilter(dto);
    }
    getTimeReport(dto) {
        return this.docDetailService.getTimeReport(dto);
    }
    getDocByIDWithParams(dto) {
        return this.docDetailService.getDocDetailByIdWithFilter(dto);
    }
};
exports.DocDetailController = DocDetailController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить текущую сводку по id площадки" }),
    (0, common_1.Get)("/current/:plantId"),
    __param(0, (0, common_1.Param)("plantId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocDetailController.prototype, "getCurrentDocDetail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить текущую сводку по id площадки" }),
    (0, common_1.Get)("/current_apps/:plantId"),
    __param(0, (0, common_1.Param)("plantId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocDetailController.prototype, "getCurrentAppDocDetail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить завтрашнюю сводку по id площадки" }),
    (0, common_1.Get)("/tomorrow_apps/:plantId"),
    __param(0, (0, common_1.Param)("plantId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocDetailController.prototype, "getTomorrowAppDocDetail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить сводку по id документа" }),
    (0, common_1.Get)("/:doc_id"),
    __param(0, (0, common_1.Param)("doc_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocDetailController.prototype, "getDocDetailByDocId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить строку сводки по id" }),
    (0, common_1.Get)("/record/:record_id"),
    __param(0, (0, common_1.Param)("record_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocDetailController.prototype, "getRecordDetail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить все записи с параметрами" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_current_doc_dto_1.GetCurrentDocDto]),
    __metadata("design:returntype", void 0)
], DocDetailController.prototype, "getCurrentDocWithParams", null);
__decorate([
    (0, common_1.Post)("/time_report"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [time_report_dto_1.TimeReportDto]),
    __metadata("design:returntype", void 0)
], DocDetailController.prototype, "getTimeReport", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: "Получить все записи с параметрами по id документа",
    }),
    (0, common_1.Post)("/by_id"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_doc_by_id_dto_1.GetDocByIdDto]),
    __metadata("design:returntype", void 0)
], DocDetailController.prototype, "getDocByIDWithParams", null);
exports.DocDetailController = DocDetailController = __decorate([
    (0, swagger_1.ApiTags)("Сводки тест"),
    (0, common_1.Controller)("doc_detail"),
    __metadata("design:paramtypes", [doc_detail_service_1.DocDetailService])
], DocDetailController);
//# sourceMappingURL=doc.detail.controller.js.map