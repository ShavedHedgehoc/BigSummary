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
exports.GetWeightingsSummaryDetailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class GetWeightingsSummaryDetailDto {
}
exports.GetWeightingsSummaryDetailDto = GetWeightingsSummaryDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2025-10-06 00:00:00.000",
        description: "Начальная дата",
    }),
    __metadata("design:type", String)
], GetWeightingsSummaryDetailDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2025-10-31 00:00:00.000",
        description: "Конечная дата",
    }),
    __metadata("design:type", String)
], GetWeightingsSummaryDetailDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 28538, description: "id работника" }),
    __metadata("design:type", Number)
], GetWeightingsSummaryDetailDto.prototype, "author_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: "На странице" }),
    __metadata("design:type", Number)
], GetWeightingsSummaryDetailDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "Страница" }),
    __metadata("design:type", Number)
], GetWeightingsSummaryDetailDto.prototype, "page", void 0);
//# sourceMappingURL=get-weightings-summary-detail.dto.js.map