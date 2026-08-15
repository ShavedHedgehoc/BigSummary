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
const sequelize_typescript_1 = require("sequelize-typescript");
const marking_sample_model_1 = __importDefault(require("../../../../../../../src/marking_sample/marking_sample.model"));
const records_model_1 = __importDefault(require("../../../../../../../src/records/records.model"));
let RecordRegulation = class RecordRegulation extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true }),
    __metadata("design:type", Number)
], RecordRegulation.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => records_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], RecordRegulation.prototype, "record_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL }),
    __metadata("design:type", Number)
], RecordRegulation.prototype, "org_base_min_weight", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL }),
    __metadata("design:type", Number)
], RecordRegulation.prototype, "org_base_max_weight", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL }),
    __metadata("design:type", Number)
], RecordRegulation.prototype, "water_base_min_weight", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL }),
    __metadata("design:type", Number)
], RecordRegulation.prototype, "water_base_max_weight", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], RecordRegulation.prototype, "per_box", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], RecordRegulation.prototype, "box_per_row", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], RecordRegulation.prototype, "row_on_pallet", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], RecordRegulation.prototype, "gasket", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN }),
    __metadata("design:type", Boolean)
], RecordRegulation.prototype, "seal", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], RecordRegulation.prototype, "technician_note", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], RecordRegulation.prototype, "packaging_note", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => marking_sample_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], RecordRegulation.prototype, "marking_sample_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], RecordRegulation.prototype, "inc_color", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], RecordRegulation.prototype, "marking_feature", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => records_model_1.default),
    __metadata("design:type", typeof (_a = typeof records_model_1.default !== "undefined" && records_model_1.default) === "function" ? _a : Object)
], RecordRegulation.prototype, "record", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => marking_sample_model_1.default),
    __metadata("design:type", typeof (_b = typeof marking_sample_model_1.default !== "undefined" && marking_sample_model_1.default) === "function" ? _b : Object)
], RecordRegulation.prototype, "marking_sample", void 0);
RecordRegulation = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "record_regulations" })
], RecordRegulation);
exports.default = RecordRegulation;
//# sourceMappingURL=record_regulations.model.js.map