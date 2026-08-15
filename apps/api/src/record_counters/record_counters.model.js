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
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const records_model_1 = __importDefault(require("../../../../../../../src/records/records.model"));
let RecordCounter = class RecordCounter extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "Уникальный id записи" }),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true }),
    __metadata("design:type", Number)
], RecordCounter.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15, description: "id строки сводки" }),
    (0, sequelize_typescript_1.ForeignKey)(() => records_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], RecordCounter.prototype, "record_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "c4a40b9a-a608-4a38-832b-6b16d0cc8a72",
        description: "uuid задачи маркировки",
    }),
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], RecordCounter.prototype, "task_uid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15, description: "Значение счетчика" }),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], RecordCounter.prototype, "counter_value", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => records_model_1.default),
    __metadata("design:type", typeof (_a = typeof records_model_1.default !== "undefined" && records_model_1.default) === "function" ? _a : Object)
], RecordCounter.prototype, "record", void 0);
RecordCounter = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "record_counters" })
], RecordCounter);
exports.default = RecordCounter;
//# sourceMappingURL=record_counters.model.js.map