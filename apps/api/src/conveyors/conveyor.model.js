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
const records_model_1 = __importDefault(require("../../../../../../../src/records/records.model"));
let Conveyor = class Conveyor extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "Уникальный id конвейера" }),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true }),
    __metadata("design:type", Number)
], Conveyor.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "118", description: "Конвейер" }),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true }),
    __metadata("design:type", String)
], Conveyor.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2000000000012", description: "Штрихкод" }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true }),
    __metadata("design:type", String)
], Conveyor.prototype, "barcode", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => records_model_1.default),
    __metadata("design:type", Array)
], Conveyor.prototype, "records", void 0);
Conveyor = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "conveyors", createdAt: false, updatedAt: false })
], Conveyor);
exports.default = Conveyor;
//# sourceMappingURL=conveyor.model.js.map