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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const boil_model_1 = __importDefault(require("../../../../../../../src/boils/boil.model"));
const products_model_1 = __importDefault(require("../../../../../../../src/products/products.model"));
const records_model_1 = __importDefault(require("../../../../../../../src/records/records.model"));
let SemiProduct = class SemiProduct extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true }),
    __metadata("design:type", Number)
], SemiProduct.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => records_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SemiProduct.prototype, "record_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => products_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SemiProduct.prototype, "product_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => boil_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], SemiProduct.prototype, "boil_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => records_model_1.default),
    __metadata("design:type", typeof (_a = typeof records_model_1.default !== "undefined" && records_model_1.default) === "function" ? _a : Object)
], SemiProduct.prototype, "record", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => products_model_1.default),
    __metadata("design:type", typeof (_b = typeof products_model_1.default !== "undefined" && products_model_1.default) === "function" ? _b : Object)
], SemiProduct.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => boil_model_1.default),
    __metadata("design:type", typeof (_c = typeof boil_model_1.default !== "undefined" && boil_model_1.default) === "function" ? _c : Object)
], SemiProduct.prototype, "boil", void 0);
SemiProduct = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "semi_products" })
], SemiProduct);
exports.default = SemiProduct;
//# sourceMappingURL=semi_products.model.js.map