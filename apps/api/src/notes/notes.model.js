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
const histories_model_1 = __importDefault(require("../../../../../../../src/histories/histories.model"));
let Note = class Note extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "Уникальный id " }),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true }),
    __metadata("design:type", Number)
], Note.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Комментарий к записи",
        description: "Значение комментария",
    }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Note.prototype, "value", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => histories_model_1.default),
    __metadata("design:type", typeof (_a = typeof histories_model_1.default !== "undefined" && histories_model_1.default) === "function" ? _a : Object)
], Note.prototype, "history", void 0);
Note = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "notes", createdAt: false, updatedAt: false })
], Note);
exports.default = Note;
//# sourceMappingURL=notes.model.js.map