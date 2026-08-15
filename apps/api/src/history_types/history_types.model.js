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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const histories_model_1 = __importDefault(require("../../../../../../../src/histories/histories.model"));
let HistoryType = class HistoryType extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "Уникальный id типа записи" }),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true }),
    __metadata("design:type", Number)
], HistoryType.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "base_check", description: "Тип записи" }),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true }),
    __metadata("design:type", String)
], HistoryType.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Основа на пробе",
        description: "Описание типа записи",
    }),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true }),
    __metadata("design:type", String)
], HistoryType.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "true", description: "Статусы принадлежат основе" }),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN }),
    __metadata("design:type", Boolean)
], HistoryType.prototype, "for_boil", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => histories_model_1.default),
    __metadata("design:type", Array)
], HistoryType.prototype, "hystorys", void 0);
HistoryType = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "history_types", createdAt: false, updatedAt: false })
], HistoryType);
exports.default = HistoryType;
//# sourceMappingURL=history_types.model.js.map