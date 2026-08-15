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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTraceBatchsWghtReportDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class GetTraceBatchsWghtReportDto {
}
exports.GetTraceBatchsWghtReportDto = GetTraceBatchsWghtReportDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: `{"batchName":"", "productId":"", "startDate":"2022-02-01 00:00:00.000", "endDate":"2022-02-01 00:00:00.000", "compare":false, "plants":[]}`,
        description: "Фильтр",
    }),
    __metadata("design:type", Object)
], GetTraceBatchsWghtReportDto.prototype, "filter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: "На странице" }),
    __metadata("design:type", Number)
], GetTraceBatchsWghtReportDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "Страница" }),
    __metadata("design:type", Number)
], GetTraceBatchsWghtReportDto.prototype, "page", void 0);
//# sourceMappingURL=get-trace-batchs-wght-report.dto.js.map