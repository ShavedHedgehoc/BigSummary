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
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const bases_model_1 = __importDefault(require("../../../../../../../src/bases/bases.model"));
const histories_model_1 = __importDefault(require("../../../../../../../src/histories/histories.model"));
const plant_model_1 = __importDefault(require("../../../../../../../src/plants/plant.model"));
const records_model_1 = __importDefault(require("../../../../../../../src/records/records.model"));
const semi_products_model_1 = __importDefault(require("../../../../../../../src/semi_products/semi_products.model"));
let Boil = class Boil extends sequelize_typescript_1.Model {
    static addMonthLetter(instance) {
        const val = instance.value;
        const lastSymbol = val.substring(val.length - 1);
        const lastTwoSymbols = val.substring(val.length - 2);
        let offset = 0;
        if (lastTwoSymbols === "RS" || lastTwoSymbols === "SR") {
            offset = 2;
        }
        else if (["Z", "Y", "S", "R", "X"].includes(lastSymbol)) {
            offset = 1;
        }
        const yearEndIdx = val.length - offset;
        const potentialTwoDigitYear = val.substring(yearEndIdx - 2, yearEndIdx);
        if (!isNaN(Number(potentialTwoDigitYear)) && potentialTwoDigitYear.length === 2) {
            instance.year = Number("20" + potentialTwoDigitYear);
            instance.letter = val.substring(yearEndIdx - 3, yearEndIdx - 2);
            instance.number = Number(val.substring(0, yearEndIdx - 3));
        }
        else {
            const oneDigitYear = val.substring(yearEndIdx - 1, yearEndIdx);
            instance.year = Number("202" + oneDigitYear);
            instance.letter = val.substring(yearEndIdx - 2, yearEndIdx - 1);
            instance.number = Number(val.substring(0, yearEndIdx - 2));
        }
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "Уникальный id варки" }),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true }),
    __metadata("design:type", Number)
], Boil.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "123A4Y", description: "Варка" }),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true }),
    __metadata("design:type", String)
], Boil.prototype, "value", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => bases_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Boil.prototype, "base_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => plant_model_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Boil.prototype, "plant_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Boil.prototype, "letter", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Boil.prototype, "number", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Boil.prototype, "year", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => bases_model_1.default),
    __metadata("design:type", typeof (_a = typeof bases_model_1.default !== "undefined" && bases_model_1.default) === "function" ? _a : Object)
], Boil.prototype, "base", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => plant_model_1.default),
    __metadata("design:type", typeof (_b = typeof plant_model_1.default !== "undefined" && plant_model_1.default) === "function" ? _b : Object)
], Boil.prototype, "plant", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => records_model_1.default, "boilId"),
    __metadata("design:type", Array)
], Boil.prototype, "records", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => records_model_1.default, "water_base_id"),
    __metadata("design:type", Array)
], Boil.prototype, "water_base_records", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => records_model_1.default, "organic_base_id"),
    __metadata("design:type", Array)
], Boil.prototype, "organic_base_records", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => histories_model_1.default),
    __metadata("design:type", Array)
], Boil.prototype, "histories", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => semi_products_model_1.default),
    __metadata("design:type", Array)
], Boil.prototype, "semi_products", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boil]),
    __metadata("design:returntype", void 0)
], Boil, "addMonthLetter", null);
Boil = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "boils", createdAt: false, updatedAt: false })
], Boil);
exports.default = Boil;
//# sourceMappingURL=boil.model.js.map