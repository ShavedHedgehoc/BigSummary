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
const sequelize_typescript_1 = require("sequelize-typescript");
const trace_product_model_1 = __importDefault(require("./trace_product.model"));
const trace_batch_model_1 = __importDefault(require("./trace_batch.model"));
let TraceBtProduct = class TraceBtProduct extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceBtProduct.prototype, "BtProductPK", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_product_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceBtProduct.prototype, "ProductId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_batch_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceBtProduct.prototype, "BatchPK", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_product_model_1.default),
    __metadata("design:type", trace_product_model_1.default)
], TraceBtProduct.prototype, "trace_product", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_batch_model_1.default),
    __metadata("design:type", trace_batch_model_1.default)
], TraceBtProduct.prototype, "trace_batch", void 0);
TraceBtProduct = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "BtProducts" })
], TraceBtProduct);
exports.default = TraceBtProduct;
//# sourceMappingURL=trace_bt_product.model.js.map