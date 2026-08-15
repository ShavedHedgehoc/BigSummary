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
exports.RecordRegulationsModule = void 0;
const common_1 = require("@nestjs/common");
const record_regulations_service_1 = require("./record_regulations.service");
const sequelize_1 = require("@nestjs/sequelize");
const record_regulations_model_1 = __importDefault(require("./record_regulations.model"));
let RecordRegulationsModule = class RecordRegulationsModule {
};
exports.RecordRegulationsModule = RecordRegulationsModule;
exports.RecordRegulationsModule = RecordRegulationsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([record_regulations_model_1.default])],
        providers: [record_regulations_service_1.RecordRegulationsService],
        exports: [record_regulations_service_1.RecordRegulationsService],
    })
], RecordRegulationsModule);
//# sourceMappingURL=record_regulations.module.js.map