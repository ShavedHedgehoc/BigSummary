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
exports.PlantsModule = void 0;
const common_1 = require("@nestjs/common");
const plants_service_1 = require("./plants.service");
const plants_controller_1 = require("./plants.controller");
const sequelize_1 = require("@nestjs/sequelize");
const plant_model_1 = __importDefault(require("./plant.model"));
let PlantsModule = class PlantsModule {
};
exports.PlantsModule = PlantsModule;
exports.PlantsModule = PlantsModule = __decorate([
    (0, common_1.Module)({
        providers: [plants_service_1.PlantsService],
        controllers: [plants_controller_1.PlantsController],
        imports: [
            sequelize_1.SequelizeModule.forFeature([plant_model_1.default]),
        ],
        exports: [plants_service_1.PlantsService],
    })
], PlantsModule);
//# sourceMappingURL=plants.module.js.map