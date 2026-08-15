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
const regulations_model_1 = __importDefault(require("../../../../../../../src/regulations/regulations.model"));
const semi_products_model_1 = __importDefault(require("../../../../../../../src/semi_products/semi_products.model"));
const series_model_1 = __importDefault(require("../../../../../../../src/series/series.model"));
let Product = class Product extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "Уникальный id продукта" }),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true }),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "058671", description: "Код 1С продукта" }),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true }),
    __metadata("design:type", String)
], Product.prototype, "code1C", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "CNT9/65", description: "Артикул продукта" }),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Product.prototype, "marking", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "CNT9/65 Тонирующая маска для волос NEWTONE ESTEL HAUTE COUTURE 9/65 Блондин фиолетово-красный, 400 мл",
        description: "Наименование продукта",
    }),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => series_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Product.prototype, "serieId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => series_model_1.default),
    __metadata("design:type", typeof (_a = typeof series_model_1.default !== "undefined" && series_model_1.default) === "function" ? _a : Object)
], Product.prototype, "serie", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => regulations_model_1.default),
    __metadata("design:type", typeof (_b = typeof regulations_model_1.default !== "undefined" && regulations_model_1.default) === "function" ? _b : Object)
], Product.prototype, "regulation", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => semi_products_model_1.default),
    __metadata("design:type", Array)
], Product.prototype, "semi_products", void 0);
Product = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "products" })
], Product);
exports.default = Product;
//# sourceMappingURL=products.model.js.map