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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const products_model_1 = __importDefault(require("./products.model"));
const series_service_1 = require("../../../../../../../src/series/series.service");
let ProductsService = class ProductsService {
    constructor(productRepository, serieService) {
        this.productRepository = productRepository;
        this.serieService = serieService;
    }
    async createProduct(dto) {
        const serie = await this.serieService.getOrCreateByValue(dto.serie);
        const product = await this.productRepository.create({
            ...dto,
            serieId: serie.id,
        });
        return product;
    }
    async getAllProducts() {
        const products = await this.productRepository.findAll({
            include: { all: true },
        });
        return products;
    }
    async getById(id) {
        const product = await this.productRepository.findByPk(id);
        return product;
    }
    async getOrCreateByCode(code, marking, serieId) {
        const existProduct = await this.productRepository.findOne({
            where: { code1C: code },
        });
        if (existProduct) {
            return existProduct;
        }
        const product = await this.productRepository.create({
            code1C: code,
            marking: marking,
            serieId: serieId,
        });
        return product;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(products_model_1.default)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof series_service_1.SeriesService !== "undefined" && series_service_1.SeriesService) === "function" ? _a : Object])
], ProductsService);
//# sourceMappingURL=products.service.js.map