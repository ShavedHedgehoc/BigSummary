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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const series_service_1 = require("./series.service");
const series_model_1 = __importDefault(require("./series.model"));
const create_serie_dto_1 = require("./dto/create-serie.dto");
let SeriesController = class SeriesController {
    constructor(seriesService) {
        this.seriesService = seriesService;
    }
    getAll() {
        return this.seriesService.getAllSeries();
    }
    create(serieDto) {
        return this.seriesService.createSerie(serieDto);
    }
};
exports.SeriesController = SeriesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить все серии продуктов" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [series_model_1.default] }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SeriesController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Создание новой серии" }),
    (0, swagger_1.ApiResponse)({ status: 201, type: series_model_1.default }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_serie_dto_1.CreateSerieDto]),
    __metadata("design:returntype", void 0)
], SeriesController.prototype, "create", null);
exports.SeriesController = SeriesController = __decorate([
    (0, swagger_1.ApiTags)("Серии продуктов"),
    (0, common_1.Controller)("series"),
    __metadata("design:paramtypes", [series_service_1.SeriesService])
], SeriesController);
//# sourceMappingURL=series.controller.js.map