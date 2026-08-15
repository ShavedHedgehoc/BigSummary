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
const trace_weighting_model_1 = __importDefault(require("./trace_weighting.model"));
const trace_seller_model_1 = __importDefault(require("./trace_seller.model"));
const trace_manufacturer_model_1 = __importDefault(require("./trace_manufacturer.model"));
const trace_manufacturer_lot_model_1 = __importDefault(require("./trace_manufacturer_lot.model"));
const trace_trademark_model_1 = __importDefault(require("./trace_trademark.model"));
const trace_inventory_row_model_1 = __importDefault(require("./trace_inventory_row.model"));
let TraceLot = class TraceLot extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceLot.prototype, "LotPK", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TraceLot.prototype, "LotName", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_product_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceLot.prototype, "ProductId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_seller_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceLot.prototype, "SellerPK", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_manufacturer_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceLot.prototype, "ManufacturerPK", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_manufacturer_lot_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceLot.prototype, "ManufacturerLotPK", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_trademark_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceLot.prototype, "TradeMarkPK", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_product_model_1.default),
    __metadata("design:type", trace_product_model_1.default)
], TraceLot.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_seller_model_1.default),
    __metadata("design:type", trace_seller_model_1.default)
], TraceLot.prototype, "seller", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_manufacturer_model_1.default),
    __metadata("design:type", trace_manufacturer_model_1.default)
], TraceLot.prototype, "manufacturer", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_manufacturer_lot_model_1.default),
    __metadata("design:type", trace_manufacturer_lot_model_1.default)
], TraceLot.prototype, "manufacturer_lot", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_trademark_model_1.default),
    __metadata("design:type", trace_trademark_model_1.default)
], TraceLot.prototype, "trademark", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => trace_weighting_model_1.default),
    __metadata("design:type", Array)
], TraceLot.prototype, "weightings", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => trace_inventory_row_model_1.default),
    __metadata("design:type", Array)
], TraceLot.prototype, "inventory_rows", void 0);
TraceLot = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "Lots" })
], TraceLot);
exports.default = TraceLot;
//# sourceMappingURL=trace_lot.model.js.map