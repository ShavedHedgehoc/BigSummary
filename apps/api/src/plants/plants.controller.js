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
exports.PlantsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const plants_service_1 = require("./plants.service");
const plant_model_1 = __importDefault(require("./plant.model"));
const create_plant_dto_1 = require("./dto/create-plant.dto");
let PlantsController = class PlantsController {
    constructor(plantService) {
        this.plantService = plantService;
    }
    getAll() {
        return this.plantService.getAllPlants();
    }
    getByName(plantName) {
        return this.plantService.getPlantByValue(plantName);
    }
    create(dto) {
        return this.plantService.createPlant(dto);
    }
};
exports.PlantsController = PlantsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить все площадки" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [plant_model_1.default] }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить площадку по имени" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: plant_model_1.default }),
    (0, common_1.Get)("/:plantName"),
    __param(0, (0, common_1.Param)("plantName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "getByName", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Создание новой площадки" }),
    (0, swagger_1.ApiResponse)({ status: 201, type: plant_model_1.default }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_plant_dto_1.CreatePlantDto]),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "create", null);
exports.PlantsController = PlantsController = __decorate([
    (0, swagger_1.ApiTags)("Площадки"),
    (0, common_1.Controller)("plants"),
    __metadata("design:paramtypes", [plants_service_1.PlantsService])
], PlantsController);
//# sourceMappingURL=plants.controller.js.map