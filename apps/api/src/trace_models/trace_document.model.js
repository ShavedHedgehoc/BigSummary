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
const trace_weighting_model_1 = __importDefault(require("./trace_weighting.model"));
const trace_author_model_1 = __importDefault(require("./trace_author.model"));
const trace_weighting_model_2 = __importDefault(require("./trace_weighting.model"));
let TraceDocument = class TraceDocument extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceDocument.prototype, "DocumentPK", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TraceDocument.prototype, "DocumentClid", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceDocument.prototype, "DoctypePK", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => trace_author_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], TraceDocument.prototype, "AuthorPK", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], TraceDocument.prototype, "CreateDate", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], TraceDocument.prototype, "Plant", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => trace_author_model_1.default),
    __metadata("design:type", trace_author_model_1.default)
], TraceDocument.prototype, "author", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => trace_weighting_model_1.default),
    __metadata("design:type", Array)
], TraceDocument.prototype, "weightings", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => trace_weighting_model_2.default),
    __metadata("design:type", Array)
], TraceDocument.prototype, "loads", void 0);
TraceDocument = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "Documents" })
], TraceDocument);
exports.default = TraceDocument;
//# sourceMappingURL=trace_document.model.js.map