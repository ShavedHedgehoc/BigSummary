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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegulationsService = void 0;
const common_1 = require("@nestjs/common");
const regulations_model_1 = __importDefault(require("./regulations.model"));
const products_service_1 = require("../../../../../../../src/products/products.service");
const sequelize_1 = require("@nestjs/sequelize");
const marking_sample_service_1 = require("../../../../../../../src/marking_sample/marking_sample.service");
const series_service_1 = require("../../../../../../../src/series/series.service");
const marking_sample_model_1 = __importDefault(require("../../../../../../../src/marking_sample/marking_sample.model"));
const products_model_1 = __importDefault(require("../../../../../../../src/products/products.model"));
const sequelize_2 = require("sequelize");
let RegulationsService = class RegulationsService {
    constructor(regulationRepository, productService, markingSampleService, seriesService) {
        this.regulationRepository = regulationRepository;
        this.productService = productService;
        this.markingSampleService = markingSampleService;
        this.seriesService = seriesService;
    }
    async bulkUpdateRegulations(dto) {
        for (let index = 0; index < dto.length; index++) {
            try {
                const serie = await this.seriesService.getOrCreateByValue(dto[index].serie);
                const product = await this.productService.getOrCreateByCode(dto[index].code, dto[index].marking, serie.id);
                const marking_sample = await this.markingSampleService.getOrCreateByValue(dto[index].marking_sample);
                const [regulation, created] = await this.regulationRepository.findOrCreate({
                    where: { product_id: product.id },
                });
                regulation.water_base_min_weight = Number(dto[index].water_base_min_weight);
                regulation.water_base_max_weight = Number(dto[index].water_base_max_weight);
                regulation.per_box = Number(dto[index].per_box);
                regulation.box_per_row = Number(dto[index].box_per_row);
                regulation.row_on_pallet = Number(dto[index].row_on_pallet);
                regulation.gasket =
                    dto[index].gasket === "-" ? null : dto[index].gasket;
                regulation.seal = dto[index].seal;
                regulation.technician_note =
                    dto[index].technician_note === "-"
                        ? null
                        : dto[index].technician_note;
                regulation.packaging_note =
                    dto[index].packaging_note === "-" ? null : dto[index].packaging_note;
                regulation.marking_sample_id = marking_sample
                    ? marking_sample.id
                    : null;
                await regulation.save();
            }
            catch (error) {
                throw new common_1.HttpException(`Ошибка при обновлении в строке №${index + 1}, обновление прервано`, common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    async getByProductCode(code) {
        const regulation = await this.regulationRepository.findOne({
            attributes: {
                include: [[(0, sequelize_2.col)("marking_sample.value"), "marking_sample_value"]],
                exclude: ["createdAt", "updatedAt"],
            },
            include: [
                { model: marking_sample_model_1.default, as: "marking_sample", attributes: [] },
                { model: products_model_1.default, where: { code1C: code }, attributes: [] },
            ],
        });
        return regulation;
    }
};
exports.RegulationsService = RegulationsService;
exports.RegulationsService = RegulationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(regulations_model_1.default)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof products_service_1.ProductsService !== "undefined" && products_service_1.ProductsService) === "function" ? _a : Object, typeof (_b = typeof marking_sample_service_1.MarkingSampleService !== "undefined" && marking_sample_service_1.MarkingSampleService) === "function" ? _b : Object, typeof (_c = typeof series_service_1.SeriesService !== "undefined" && series_service_1.SeriesService) === "function" ? _c : Object])
], RegulationsService);
//# sourceMappingURL=regulations.service.js.map