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
const trace_can_model_1 = __importDefault(require("./trace_can.model"));
const trace_author_model_1 = __importDefault(require("./trace_author.model"));
const trace_batch_model_1 = __importDefault(require("./trace_batch.model"));
const trace_can_state_model_1 = __importDefault(require("./trace_can_state.model"));
let TraceCanRecord = class TraceCanRecord extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceCanRecord.prototype, "CanRecordPK", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_can_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceCanRecord.prototype, "CanPK", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_author_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceCanRecord.prototype, "AuthorPK", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_batch_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceCanRecord.prototype, "BatchPK", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_can_state_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceCanRecord.prototype, "CanStatePK", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], TraceCanRecord.prototype, "CreateDate", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_can_model_1.default),
    __metadata("design:type", trace_can_model_1.default)
], TraceCanRecord.prototype, "can", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_author_model_1.default),
    __metadata("design:type", trace_author_model_1.default)
], TraceCanRecord.prototype, "author", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_batch_model_1.default),
    __metadata("design:type", trace_batch_model_1.default)
], TraceCanRecord.prototype, "batch", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_can_state_model_1.default),
    __metadata("design:type", trace_can_state_model_1.default)
], TraceCanRecord.prototype, "state", void 0);
TraceCanRecord = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "CanRecords" })
], TraceCanRecord);
exports.default = TraceCanRecord;
//# sourceMappingURL=trace_can_record.model.js.map