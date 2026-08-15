"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemiProductsModule = void 0;
const common_1 = require("@nestjs/common");
const semi_products_service_1 = require("./semi_products.service");
const sequelize_1 = require("@nestjs/sequelize");
const semi_products_model_1 = __importDefault(require("./semi_products.model"));
const products_module_1 = require("../../../../../../../src/products/products.module");
const boils_module_1 = require("../../../../../../../src/boils/boils.module");
let SemiProductsModule = class SemiProductsModule {
};
exports.SemiProductsModule = SemiProductsModule;
exports.SemiProductsModule = SemiProductsModule = __decorate([
    (0, common_1.Module)({
        providers: [semi_products_service_1.SemiProductsService],
        imports: [
            sequelize_1.SequelizeModule.forFeature([semi_products_model_1.default]),
            products_module_1.ProductsModule,
            boils_module_1.BoilsModule,
        ],
        exports: [semi_products_service_1.SemiProductsService],
    })
], SemiProductsModule);
//# sourceMappingURL=semi_products.module.js.map