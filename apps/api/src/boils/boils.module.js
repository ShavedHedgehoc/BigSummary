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
exports.BoilsModule = void 0;
const common_1 = require("@nestjs/common");
const boils_controller_1 = require("./boils.controller");
const boils_service_1 = require("./boils.service");
const sequelize_1 = require("@nestjs/sequelize");
const boil_model_1 = __importDefault(require("./boil.model"));
let BoilsModule = class BoilsModule {
};
exports.BoilsModule = BoilsModule;
exports.BoilsModule = BoilsModule = __decorate([
    (0, common_1.Module)({
        controllers: [boils_controller_1.BoilsController],
        providers: [boils_service_1.BoilsService],
        imports: [sequelize_1.SequelizeModule.forFeature([boil_model_1.default])],
        exports: [boils_service_1.BoilsService],
    })
], BoilsModule);
//# sourceMappingURL=boils.module.js.map