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
exports.BasesModule = void 0;
const common_1 = require("@nestjs/common");
const bases_service_1 = require("./bases.service");
const sequelize_1 = require("@nestjs/sequelize");
const bases_model_1 = __importDefault(require("./bases.model"));
const bases_controller_1 = require("./bases.controller");
let BasesModule = class BasesModule {
};
exports.BasesModule = BasesModule;
exports.BasesModule = BasesModule = __decorate([
    (0, common_1.Module)({
        providers: [bases_service_1.BasesService],
        controllers: [bases_controller_1.BaseController],
        imports: [sequelize_1.SequelizeModule.forFeature([bases_model_1.default])],
        exports: [bases_service_1.BasesService],
    })
], BasesModule);
//# sourceMappingURL=bases.module.js.map