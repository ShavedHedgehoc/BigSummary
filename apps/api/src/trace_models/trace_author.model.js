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
const trace_document_model_1 = __importDefault(require("./trace_document.model"));
const trace_boil_record_model_1 = __importDefault(require("./trace_boil_record.model"));
const trace_can_record_model_1 = __importDefault(require("./trace_can_record.model"));
const trace_can_location_model_1 = __importDefault(require("./trace_can_location.model"));
const trace_inventory_row_model_1 = __importDefault(require("./trace_inventory_row.model"));
const tarce_author_occupation_model_1 = __importDefault(require("./tarce_author_occupation.model"));
let TraceAuthor = class TraceAuthor extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceAuthor.prototype, "AuthorPK", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TraceAuthor.prototype, "AuthorName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TraceAuthor.prototype, "AuthorBarcode", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => trace_document_model_1.default),
    __metadata("design:type", Array)
], TraceAuthor.prototype, "documents", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => trace_boil_record_model_1.default),
    __metadata("design:type", Array)
], TraceAuthor.prototype, "boil_records", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => trace_can_record_model_1.default),
    __metadata("design:type", Array)
], TraceAuthor.prototype, "can_records", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => trace_can_location_model_1.default),
    __metadata("design:type", Array)
], TraceAuthor.prototype, "locations", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => trace_inventory_row_model_1.default),
    __metadata("design:type", Array)
], TraceAuthor.prototype, "inventory_rows", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => tarce_author_occupation_model_1.default),
    __metadata("design:type", tarce_author_occupation_model_1.default)
], TraceAuthor.prototype, "occupation", void 0);
TraceAuthor = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "Authors" })
], TraceAuthor);
exports.default = TraceAuthor;
//# sourceMappingURL=trace_author.model.js.map