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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const marking_sample_model_1 = __importDefault(require("../../../../../../../src/marking_sample/marking_sample.model"));
const products_model_1 = __importDefault(require("../../../../../../../src/products/products.model"));
let Regulation = class Regulation extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "Уникальный id строки" }),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true }),
    __metadata("design:type", Number)
], Regulation.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => products_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Regulation.prototype, "product_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL }),
    __metadata("design:type", Number)
], Regulation.prototype, "water_base_min_weight", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL }),
    __metadata("design:type", Number)
], Regulation.prototype, "water_base_max_weight", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Regulation.prototype, "per_box", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Regulation.prototype, "box_per_row", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Regulation.prototype, "row_on_pallet", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Regulation.prototype, "gasket", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN }),
    __metadata("design:type", Boolean)
], Regulation.prototype, "seal", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Regulation.prototype, "technician_note", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Regulation.prototype, "packaging_note", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => marking_sample_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Regulation.prototype, "marking_sample_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => products_model_1.default),
    __metadata("design:type", typeof (_a = typeof products_model_1.default !== "undefined" && products_model_1.default) === "function" ? _a : Object)
], Regulation.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => marking_sample_model_1.default),
    __metadata("design:type", typeof (_b = typeof marking_sample_model_1.default !== "undefined" && marking_sample_model_1.default) === "function" ? _b : Object)
], Regulation.prototype, "marking_sample", void 0);
Regulation = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "regulations" })
], Regulation);
exports.default = Regulation;
//# sourceMappingURL=regulations.model.js.map