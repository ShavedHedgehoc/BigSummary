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
const trace_batch_model_1 = __importDefault(require("./trace_batch.model"));
const trace_operation_model_1 = __importDefault(require("./trace_operation.model"));
const trace_author_model_1 = __importDefault(require("./trace_author.model"));
let TraceBoilRecord = class TraceBoilRecord extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceBoilRecord.prototype, "BoilRecordsPK", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_batch_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceBoilRecord.prototype, "BatchId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_operation_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceBoilRecord.prototype, "OperationId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_author_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceBoilRecord.prototype, "AuthorId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceBoilRecord.prototype, "Temperature", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], TraceBoilRecord.prototype, "CreateDate", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_batch_model_1.default),
    __metadata("design:type", trace_batch_model_1.default)
], TraceBoilRecord.prototype, "batch", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_operation_model_1.default),
    __metadata("design:type", trace_operation_model_1.default)
], TraceBoilRecord.prototype, "operation", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_author_model_1.default),
    __metadata("design:type", trace_author_model_1.default)
], TraceBoilRecord.prototype, "author", void 0);
TraceBoilRecord = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "BoilRecords" })
], TraceBoilRecord);
exports.default = TraceBoilRecord;
//# sourceMappingURL=trace_boil_record.model.js.map