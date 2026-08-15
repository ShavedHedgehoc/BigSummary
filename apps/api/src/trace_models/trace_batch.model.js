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
const trace_weighting_model_2 = __importDefault(require("../../../../../../../src/trace_models/trace_weighting.model"));
const trace_boils_model_1 = __importDefault(require("./trace_boils.model"));
const swagger_1 = require("@nestjs/swagger");
const trace_can_record_model_1 = __importDefault(require("./trace_can_record.model"));
const trace_bt_product_model_1 = __importDefault(require("./trace_bt_product.model"));
let TraceBatch = class TraceBatch extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    (0, swagger_1.ApiProperty)({ example: 123, description: "123A3" }),
    __metadata("design:type", Number)
], TraceBatch.prototype, "BatchPK", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TraceBatch.prototype, "BatchName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], TraceBatch.prototype, "BatchDate", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TraceBatch.prototype, "Plant", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => trace_weighting_model_2.default),
    __metadata("design:type", Array)
], TraceBatch.prototype, "weightings", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => trace_weighting_model_1.default),
    __metadata("design:type", Array)
], TraceBatch.prototype, "loads", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => trace_boils_model_1.default),
    __metadata("design:type", Array)
], TraceBatch.prototype, "boils", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => trace_can_record_model_1.default),
    __metadata("design:type", Array)
], TraceBatch.prototype, "can_records", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => trace_bt_product_model_1.default),
    __metadata("design:type", trace_bt_product_model_1.default)
], TraceBatch.prototype, "bt_products", void 0);
TraceBatch = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "Batchs" })
], TraceBatch);
exports.default = TraceBatch;
//# sourceMappingURL=trace_batch.model.js.map