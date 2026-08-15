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
const sequelize_typescript_1 = require("sequelize-typescript");
const trace_batch_model_1 = __importDefault(require("../../../../../../../src/trace_models/trace_batch.model"));
const trace_document_model_1 = __importDefault(require("./trace_document.model"));
const trace_container_model_1 = __importDefault(require("./trace_container.model"));
const trace_product_model_1 = __importDefault(require("./trace_product.model"));
const trace_lot_model_1 = __importDefault(require("./trace_lot.model"));
let TraceWeighting = class TraceWeighting extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceWeighting.prototype, "WeightingsPK", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_document_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceWeighting.prototype, "DocumentPK", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_container_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceWeighting.prototype, "ContainerPK", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_product_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceWeighting.prototype, "ProductId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_batch_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceWeighting.prototype, "BatchPK", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_lot_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceWeighting.prototype, "LotPK", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceWeighting.prototype, "Quantity", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_document_model_1.default),
    __metadata("design:type", trace_document_model_1.default)
], TraceWeighting.prototype, "document", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_container_model_1.default),
    __metadata("design:type", trace_container_model_1.default)
], TraceWeighting.prototype, "container", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_product_model_1.default),
    __metadata("design:type", trace_product_model_1.default)
], TraceWeighting.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_batch_model_1.default),
    __metadata("design:type", typeof (_a = typeof trace_batch_model_1.default !== "undefined" && trace_batch_model_1.default) === "function" ? _a : Object)
], TraceWeighting.prototype, "batch", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_lot_model_1.default),
    __metadata("design:type", trace_lot_model_1.default)
], TraceWeighting.prototype, "lot", void 0);
TraceWeighting = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "Weightings" })
], TraceWeighting);
exports.default = TraceWeighting;
//# sourceMappingURL=trace_weighting.model.js.map