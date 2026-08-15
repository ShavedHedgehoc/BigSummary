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
exports.UpdateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "id пользователя" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Иванов А.В.", description: "Имя пользователя" }),
    (0, class_validator_1.IsString)({ message: "Имя должно быть строкой" }),
    (0, class_validator_1.Length)(1, 60, {
        message: "Имя пользователя должно содержать от 1 до 60 символов",
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "ivanov@mail.ru",
        description: "Электронная почта пользователя",
    }),
    (0, class_validator_1.IsString)({ message: "Email должен быть строкой" }),
    (0, class_validator_1.IsEmail)({}, { message: "Некорректный email" }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: `{"plant_id":1}`,
        description: "Настройки пользователя",
    }),
    __metadata("design:type", Object)
], UpdateUserDto.prototype, "user_settings", void 0);
//# sourceMappingURL=update-user-dto.js.map