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
const plant_model_1 = __importDefault(require("../../../../../../../src/plants/plant.model"));
const records_model_1 = __importDefault(require("../../../../../../../src/records/records.model"));
let Doc = class Doc extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "Уникальный id сводки" }),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true }),
    __metadata("design:type", Number)
], Doc.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2", description: "Уникальный id площадки" }),
    (0, sequelize_typescript_1.ForeignKey)(() => plant_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Doc.prototype, "plantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "22-04-2024", description: "Дата сводки" }),
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Doc.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => plant_model_1.default),
    __metadata("design:type", typeof (_a = typeof plant_model_1.default !== "undefined" && plant_model_1.default) === "function" ? _a : Object)
], Doc.prototype, "plants", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => records_model_1.default),
    __metadata("design:type", Array)
], Doc.prototype, "records", void 0);
Doc = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "docs" })
], Doc);
exports.default = Doc;
//# sourceMappingURL=docs.model.js.map