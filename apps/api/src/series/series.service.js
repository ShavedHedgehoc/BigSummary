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
exports.SeriesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const series_model_1 = __importDefault(require("./series.model"));
let SeriesService = class SeriesService {
    constructor(serieRepository) {
        this.serieRepository = serieRepository;
    }
    async getAllSeries() {
        const series = await this.serieRepository.findAll();
        return series;
    }
    async createSerie(dto) {
        const serie = await this.serieRepository.create(dto);
        return serie;
    }
    async getOrCreateByValue(value) {
        if (value === "-" || !value) {
            return null;
        }
        const [serie, _] = await this.serieRepository.findOrCreate({
            where: { value: value },
        });
        return serie;
    }
};
exports.SeriesService = SeriesService;
exports.SeriesService = SeriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(series_model_1.default)),
    __metadata("design:paramtypes", [Object])
], SeriesService);
//# sourceMappingURL=series.service.js.map