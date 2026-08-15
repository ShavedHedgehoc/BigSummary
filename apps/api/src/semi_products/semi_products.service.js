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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemiProductsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const semi_products_model_1 = __importDefault(require("./semi_products.model"));
const products_service_1 = require("../../../../../../../src/products/products.service");
const boils_service_1 = require("../../../../../../../src/boils/boils.service");
const products_model_1 = __importDefault(require("../../../../../../../src/products/products.model"));
const boil_model_1 = __importDefault(require("../../../../../../../src/boils/boil.model"));
const sequelize_2 = require("sequelize");
let SemiProductsService = class SemiProductsService {
    constructor(semiProductsService, productsService, boilsService) {
        this.semiProductsService = semiProductsService;
        this.productsService = productsService;
        this.boilsService = boilsService;
    }
    async createSemiProduct(dto) {
        const product = await this.productsService.getOrCreateByCode(dto.code, dto.marking, null);
        const boil = await this.boilsService.getOrCreateByValue(dto.boil);
        const semiProduct = await this.semiProductsService.create({
            record_id: dto.record_id,
            product_id: product.id,
            boil_id: boil.id,
        });
        return semiProduct;
    }
    async getSemiProductsByRecordId(id) {
        const semiProducts = await this.semiProductsService.findAll({
            where: { record_id: id },
            attributes: {
                exclude: [
                    "id",
                    "record_id",
                    "product_id",
                    "boil_id",
                    "createdAt",
                    "updatedAt",
                ],
                include: [
                    [(0, sequelize_2.col)("product.code1C"), "code"],
                    [(0, sequelize_2.col)("product.marking"), "marking"],
                    [(0, sequelize_2.col)("boil.value"), "boil_value"],
                ],
            },
            include: [
                { model: products_model_1.default, as: "product", attributes: [] },
                { model: boil_model_1.default, as: "boil", attributes: [] },
            ],
        });
        return semiProducts;
    }
};
exports.SemiProductsService = SemiProductsService;
exports.SemiProductsService = SemiProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(semi_products_model_1.default)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof products_service_1.ProductsService !== "undefined" && products_service_1.ProductsService) === "function" ? _a : Object, typeof (_b = typeof boils_service_1.BoilsService !== "undefined" && boils_service_1.BoilsService) === "function" ? _b : Object])
], SemiProductsService);
//# sourceMappingURL=semi_products.service.js.map