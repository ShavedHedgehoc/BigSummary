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
const trace_can_record_model_1 = __importDefault(require("./trace_can_record.model"));
const trace_can_location_model_1 = __importDefault(require("./trace_can_location.model"));
let TraceCan = class TraceCan extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceCan.prototype, "CanPK", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TraceCan.prototype, "CanName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceCan.prototype, "CanVolume", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TraceCan.prototype, "CanBarcode", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TraceCan.prototype, "CanOrderValue", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => trace_can_record_model_1.default),
    __metadata("design:type", Array)
], TraceCan.prototype, "can_records", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => trace_can_location_model_1.default),
    __metadata("design:type", Array)
], TraceCan.prototype, "locations", void 0);
TraceCan = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "Cans" })
], TraceCan);
exports.default = TraceCan;
//# sourceMappingURL=trace_can.model.js.map