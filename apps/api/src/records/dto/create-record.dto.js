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
exports.CreateRecordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateRecordDto {
}
exports.CreateRecordDto = CreateRecordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "", description: "" }),
    __metadata("design:type", Number)
], CreateRecordDto.prototype, "doc_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "", description: "" }),
    __metadata("design:type", String)
], CreateRecordDto.prototype, "code1C", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "", description: "" }),
    __metadata("design:type", String)
], CreateRecordDto.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "", description: "" }),
    __metadata("design:type", String)
], CreateRecordDto.prototype, "serie", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "", description: "" }),
    __metadata("design:type", String)
], CreateRecordDto.prototype, "batch", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "", description: "" }),
    __metadata("design:type", String)
], CreateRecordDto.prototype, "apparatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "", description: "" }),
    __metadata("design:type", String)
], CreateRecordDto.prototype, "can", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "", description: "" }),
    __metadata("design:type", String)
], CreateRecordDto.prototype, "conveyor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "", description: "" }),
    __metadata("design:type", Number)
], CreateRecordDto.prototype, "plan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "", description: "" }),
    __metadata("design:type", String)
], CreateRecordDto.prototype, "bbf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "", description: "" }),
    __metadata("design:type", String)
], CreateRecordDto.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "", description: "" }),
    __metadata("design:type", String)
], CreateRecordDto.prototype, "workshop", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "", description: "" }),
    __metadata("design:type", String)
], CreateRecordDto.prototype, "boil1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "", description: "" }),
    __metadata("design:type", String)
], CreateRecordDto.prototype, "boil2", void 0);
//# sourceMappingURL=create-record.dto.js.map