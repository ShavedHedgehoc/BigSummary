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
const trace_inventory_doc_model_1 = __importDefault(require("./trace_inventory_doc.model"));
const trace_product_model_1 = __importDefault(require("./trace_product.model"));
const trace_lot_model_1 = __importDefault(require("./trace_lot.model"));
const trace_author_model_1 = __importDefault(require("./trace_author.model"));
let TraceInventoryRow = class TraceInventoryRow extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceInventoryRow.prototype, "InventoryRowPK", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_inventory_doc_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceInventoryRow.prototype, "InventoryDocPK", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_product_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceInventoryRow.prototype, "ProductId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_lot_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceInventoryRow.prototype, "LotPK", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], TraceInventoryRow.prototype, "ExpDate", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceInventoryRow.prototype, "Quantity", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_author_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceInventoryRow.prototype, "AuthorPK", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], TraceInventoryRow.prototype, "CreateDate", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_inventory_doc_model_1.default),
    __metadata("design:type", trace_inventory_doc_model_1.default)
], TraceInventoryRow.prototype, "inventory_doc", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_product_model_1.default),
    __metadata("design:type", trace_product_model_1.default)
], TraceInventoryRow.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_lot_model_1.default),
    __metadata("design:type", trace_lot_model_1.default)
], TraceInventoryRow.prototype, "lot", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_author_model_1.default),
    __metadata("design:type", trace_author_model_1.default)
], TraceInventoryRow.prototype, "author", void 0);
TraceInventoryRow = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "InventoryRows" })
], TraceInventoryRow);
exports.default = TraceInventoryRow;
//# sourceMappingURL=trace_inventory_row.model.js.map