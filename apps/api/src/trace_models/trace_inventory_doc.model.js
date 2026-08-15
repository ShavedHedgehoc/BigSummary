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
const trace_plant_model_1 = __importDefault(require("./trace_plant.model"));
const trace_inventory_row_model_1 = __importDefault(require("./trace_inventory_row.model"));
let TraceInventoryDoc = class TraceInventoryDoc extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceInventoryDoc.prototype, "InventoryDocPK", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], TraceInventoryDoc.prototype, "InventoryDate", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_plant_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceInventoryDoc.prototype, "PlantPK", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], TraceInventoryDoc.prototype, "Finished", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_plant_model_1.default),
    __metadata("design:type", trace_plant_model_1.default)
], TraceInventoryDoc.prototype, "plant", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => trace_inventory_row_model_1.default),
    __metadata("design:type", Array)
], TraceInventoryDoc.prototype, "inventory_rows", void 0);
TraceInventoryDoc = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "InventoryDocs" })
], TraceInventoryDoc);
exports.default = TraceInventoryDoc;
//# sourceMappingURL=trace_inventory_doc.model.js.map