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
exports.DocsModule = void 0;
const common_1 = require("@nestjs/common");
const docs_service_1 = require("./docs.service");
const docs_controller_1 = require("./docs.controller");
const sequelize_1 = require("@nestjs/sequelize");
const docs_model_1 = __importDefault(require("./docs.model"));
const plants_module_1 = require("../../../../../../../src/plants/plants.module");
let DocsModule = class DocsModule {
};
exports.DocsModule = DocsModule;
exports.DocsModule = DocsModule = __decorate([
    (0, common_1.Module)({
        providers: [docs_service_1.DocsService],
        controllers: [docs_controller_1.DocsController],
        imports: [sequelize_1.SequelizeModule.forFeature([docs_model_1.default]), plants_module_1.PlantsModule],
        exports: [docs_service_1.DocsService],
    })
], DocsModule);
//# sourceMappingURL=docs.module.js.map