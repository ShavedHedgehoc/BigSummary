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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const boil_model_1 = __importDefault(require("../../../../../../../src/boils/boil.model"));
let Base = class Base extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "Уникальный id сводки" }),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true }),
    __metadata("design:type", Number)
], Base.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "053456", description: "Шестизначный код 1С" }),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Unique)(true),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Base.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "PC10/16", description: "Артикул основы" }),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Base.prototype, "marking", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => boil_model_1.default),
    __metadata("design:type", typeof (_a = typeof boil_model_1.default !== "undefined" && boil_model_1.default) === "function" ? _a : Object)
], Base.prototype, "boil", void 0);
Base = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "bases", createdAt: false, updatedAt: false })
], Base);
exports.default = Base;
//# sourceMappingURL=bases.model.js.map