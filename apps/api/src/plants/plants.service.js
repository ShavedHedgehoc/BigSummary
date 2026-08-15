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
exports.PlantsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const plant_model_1 = __importDefault(require("./plant.model"));
let PlantsService = class PlantsService {
    constructor(plantRepository) {
        this.plantRepository = plantRepository;
    }
    async getAllPlants() {
        const plants = await this.plantRepository.findAll();
        return plants;
    }
    async getPlantByPk(id) {
        const plants = await this.plantRepository.findByPk(id);
        return plants;
    }
    async getPlantByValue(value) {
        const plant = await this.plantRepository.findOne({
            where: { value: value },
        });
        return plant;
    }
    async createPlant(dto) {
        const plant = await this.plantRepository.create(dto);
        return plant;
    }
};
exports.PlantsService = PlantsService;
exports.PlantsService = PlantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(plant_model_1.default)),
    __metadata("design:paramtypes", [Object])
], PlantsService);
//# sourceMappingURL=plants.service.js.map