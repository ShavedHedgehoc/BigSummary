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
exports.RecordCountersModule = void 0;
const common_1 = require("@nestjs/common");
const record_counters_controller_1 = require("./record_counters.controller");
const record_counters_service_1 = require("./record_counters.service");
const sequelize_1 = require("@nestjs/sequelize");
const record_counters_model_1 = __importDefault(require("./record_counters.model"));
let RecordCountersModule = class RecordCountersModule {
};
exports.RecordCountersModule = RecordCountersModule;
exports.RecordCountersModule = RecordCountersModule = __decorate([
    (0, common_1.Module)({
        controllers: [record_counters_controller_1.RecordCountersController],
        providers: [record_counters_service_1.RecordCountersService],
        imports: [sequelize_1.SequelizeModule.forFeature([record_counters_model_1.default])],
        exports: [record_counters_service_1.RecordCountersService],
    })
], RecordCountersModule);
//# sourceMappingURL=record_counters.module.js.map