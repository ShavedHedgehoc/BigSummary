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
const trace_can_location_model_1 = __importDefault(require("./trace_can_location.model"));
const trace_inventory_doc_model_1 = __importDefault(require("./trace_inventory_doc.model"));
const tarce_author_occupation_model_1 = __importDefault(require("./tarce_author_occupation.model"));
let TracePlant = class TracePlant extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TracePlant.prototype, "PlantPK", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TracePlant.prototype, "PlantName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TracePlant.prototype, "PlantAlias", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => trace_can_location_model_1.default),
    __metadata("design:type", Array)
], TracePlant.prototype, "locations", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => trace_inventory_doc_model_1.default),
    __metadata("design:type", Array)
], TracePlant.prototype, "inventory_docs", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => tarce_author_occupation_model_1.default),
    __metadata("design:type", Array)
], TracePlant.prototype, "ocuupatioons", void 0);
TracePlant = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "Plants" })
], TracePlant);
exports.default = TracePlant;
//# sourceMappingURL=trace_plant.model.js.map