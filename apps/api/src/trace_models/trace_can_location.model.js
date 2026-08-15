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
const trace_author_model_1 = __importDefault(require("./trace_author.model"));
const trace_plant_model_1 = __importDefault(require("./trace_plant.model"));
const trace_can_model_1 = __importDefault(require("./trace_can.model"));
let TraceCanLocation = class TraceCanLocation extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceCanLocation.prototype, "CanLocationPK", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_can_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceCanLocation.prototype, "CanPK", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_plant_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceCanLocation.prototype, "PlantPK", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], TraceCanLocation.prototype, "Transit", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_author_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceCanLocation.prototype, "AuthorPK", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], TraceCanLocation.prototype, "CreateDate", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_can_model_1.default),
    __metadata("design:type", trace_can_model_1.default)
], TraceCanLocation.prototype, "can", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_plant_model_1.default),
    __metadata("design:type", trace_plant_model_1.default)
], TraceCanLocation.prototype, "plant", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_author_model_1.default),
    __metadata("design:type", trace_author_model_1.default)
], TraceCanLocation.prototype, "author", void 0);
TraceCanLocation = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "CanLocations" })
], TraceCanLocation);
exports.default = TraceCanLocation;
//# sourceMappingURL=trace_can_location.model.js.map