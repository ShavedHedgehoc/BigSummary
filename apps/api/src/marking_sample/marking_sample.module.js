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
exports.MarkingSampleModule = void 0;
const common_1 = require("@nestjs/common");
const marking_sample_service_1 = require("./marking_sample.service");
const marking_sample_controller_1 = require("./marking_sample.controller");
const sequelize_1 = require("@nestjs/sequelize");
const marking_sample_model_1 = __importDefault(require("./marking_sample.model"));
let MarkingSampleModule = class MarkingSampleModule {
};
exports.MarkingSampleModule = MarkingSampleModule;
exports.MarkingSampleModule = MarkingSampleModule = __decorate([
    (0, common_1.Module)({
        providers: [marking_sample_service_1.MarkingSampleService],
        controllers: [marking_sample_controller_1.MarkingSampleController],
        imports: [sequelize_1.SequelizeModule.forFeature([marking_sample_model_1.default])],
        exports: [marking_sample_service_1.MarkingSampleService],
    })
], MarkingSampleModule);
//# sourceMappingURL=marking_sample.module.js.map