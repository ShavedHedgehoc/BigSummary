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
const trace_weighting_model_1 = __importDefault(require("../../../../../../../src/trace_models/trace_weighting.model"));
const trace_boils_model_1 = __importDefault(require("./trace_boils.model"));
const trace_bt_product_model_1 = __importDefault(require("./trace_bt_product.model"));
const trace_inventory_row_model_1 = __importDefault(require("./trace_inventory_row.model"));
let TraceProduct = class TraceProduct extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceProduct.prototype, "ProductId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TraceProduct.prototype, "ProductName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TraceProduct.prototype, "ProductMarking", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TraceProduct.prototype, "ProductBarcode", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => trace_weighting_model_1.default),
    __metadata("design:type", Array)
], TraceProduct.prototype, "weightings", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => trace_boils_model_1.default),
    __metadata("design:type", Array)
], TraceProduct.prototype, "boils", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => trace_bt_product_model_1.default),
    __metadata("design:type", Array)
], TraceProduct.prototype, "bt_products", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => trace_inventory_row_model_1.default),
    __metadata("design:type", Array)
], TraceProduct.prototype, "inventory_rows", void 0);
TraceProduct = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "Products" })
], TraceProduct);
exports.default = TraceProduct;
//# sourceMappingURL=trace_product.model.js.map