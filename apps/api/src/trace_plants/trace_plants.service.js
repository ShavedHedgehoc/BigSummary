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
exports.TracePlantsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const trace_plant_model_1 = __importDefault(require("../../../../../../../src/trace_models/trace_plant.model"));
let TracePlantsService = class TracePlantsService {
    constructor(tracePlantRepository) {
        this.tracePlantRepository = tracePlantRepository;
    }
    async getPlants() {
        const plants = await this.tracePlantRepository.findAll();
        return plants;
    }
};
exports.TracePlantsService = TracePlantsService;
exports.TracePlantsService = TracePlantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(trace_plant_model_1.default, "trace_connection")),
    __metadata("design:paramtypes", [Object])
], TracePlantsService);
//# sourceMappingURL=trace_plants.service.js.map