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
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const boil_model_1 = __importDefault(require("../../../../../../../src/boils/boil.model"));
const docs_model_1 = __importDefault(require("../../../../../../../src/docs/docs.model"));
const histories_model_1 = __importDefault(require("../../../../../../../src/histories/histories.model"));
const user_settings_model_1 = __importDefault(require("../../../../../../../src/user-settings/user-settings.model"));
let Plant = class Plant extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "Уникальный id площадки" }),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true }),
    __metadata("design:type", Number)
], Plant.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Колпино", description: "Площадка" }),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true }),
    __metadata("design:type", String)
], Plant.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "КЛП", description: "Сокращение" }),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true }),
    __metadata("design:type", String)
], Plant.prototype, "abb", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => docs_model_1.default),
    __metadata("design:type", Array)
], Plant.prototype, "docs", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => boil_model_1.default),
    __metadata("design:type", Array)
], Plant.prototype, "boils", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => histories_model_1.default),
    __metadata("design:type", Array)
], Plant.prototype, "histories", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => user_settings_model_1.default),
    __metadata("design:type", Array)
], Plant.prototype, "user_settings", void 0);
Plant = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "plants", createdAt: false, updatedAt: false })
], Plant);
exports.default = Plant;
//# sourceMappingURL=plant.model.js.map