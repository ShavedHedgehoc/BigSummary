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
exports.AddHistoryDtoNew = exports.AddHistoryDirectDto = exports.AddHistoriesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AddHistoriesDto {
}
exports.AddHistoriesDto = AddHistoriesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "123B4", description: "Номер варки" }),
    __metadata("design:type", String)
], AddHistoriesDto.prototype, "boil", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "064290", description: "Код продукта" }),
    __metadata("design:type", String)
], AddHistoriesDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "base_check", description: "Тип записи" }),
    __metadata("design:type", String)
], AddHistoriesDto.prototype, "historyType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "id пользователя" }),
    __metadata("design:type", Number)
], AddHistoriesDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "id пользователя рабочей станции" }),
    __metadata("design:type", Number)
], AddHistoriesDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Комментарий к записи",
        description: "Комментарий к записи",
    }),
    __metadata("design:type", String)
], AddHistoriesDto.prototype, "note", void 0);
class AddHistoryDirectDto {
}
exports.AddHistoryDirectDto = AddHistoryDirectDto;
class AddHistoryDtoNew {
}
exports.AddHistoryDtoNew = AddHistoryDtoNew;
//# sourceMappingURL=add-histories.dto.js.map