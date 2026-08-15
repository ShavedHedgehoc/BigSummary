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
exports.RegulationsModule = void 0;
const common_1 = require("@nestjs/common");
const regulations_controller_1 = require("./regulations.controller");
const regulations_service_1 = require("./regulations.service");
const sequelize_1 = require("@nestjs/sequelize");
const regulations_model_1 = __importDefault(require("./regulations.model"));
const products_module_1 = require("../../../../../../../src/products/products.module");
const marking_sample_module_1 = require("../../../../../../../src/marking_sample/marking_sample.module");
const series_module_1 = require("../../../../../../../src/series/series.module");
let RegulationsModule = class RegulationsModule {
};
exports.RegulationsModule = RegulationsModule;
exports.RegulationsModule = RegulationsModule = __decorate([
    (0, common_1.Module)({
        controllers: [regulations_controller_1.RegulationsController],
        imports: [
            sequelize_1.SequelizeModule.forFeature([regulations_model_1.default]),
            products_module_1.ProductsModule,
            marking_sample_module_1.MarkingSampleModule,
            series_module_1.SeriesModule,
        ],
        providers: [regulations_service_1.RegulationsService],
    })
], RegulationsModule);
//# sourceMappingURL=regulations.module.js.map