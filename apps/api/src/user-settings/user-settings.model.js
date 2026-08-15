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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const users_model_1 = __importDefault(require("../../../../../../../src/users/users.model"));
const plant_model_1 = __importDefault(require("../../../../../../../src/plants/plant.model"));
let UserSettings = class UserSettings extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true }),
    __metadata("design:type", Number)
], UserSettings.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.default),
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], UserSettings.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => plant_model_1.default),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], UserSettings.prototype, "plant_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.default),
    __metadata("design:type", typeof (_a = typeof users_model_1.default !== "undefined" && users_model_1.default) === "function" ? _a : Object)
], UserSettings.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => plant_model_1.default),
    __metadata("design:type", typeof (_b = typeof plant_model_1.default !== "undefined" && plant_model_1.default) === "function" ? _b : Object)
], UserSettings.prototype, "plant", void 0);
UserSettings = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "user_settings", createdAt: false, updatedAt: false })
], UserSettings);
exports.default = UserSettings;
//# sourceMappingURL=user-settings.model.js.map