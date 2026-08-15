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
exports.TraceCanLocationsModule = void 0;
const common_1 = require("@nestjs/common");
const trace_can_locations_service_1 = require("./trace_can_locations.service");
const sequelize_1 = require("@nestjs/sequelize");
const trace_can_location_model_1 = __importDefault(require("../../../../../../../src/trace_models/trace_can_location.model"));
let TraceCanLocationsModule = class TraceCanLocationsModule {
};
exports.TraceCanLocationsModule = TraceCanLocationsModule;
exports.TraceCanLocationsModule = TraceCanLocationsModule = __decorate([
    (0, common_1.Module)({
        providers: [trace_can_locations_service_1.TraceCanLocationsService],
        imports: [sequelize_1.SequelizeModule.forFeature([trace_can_location_model_1.default], "trace_connection")],
        exports: [trace_can_locations_service_1.TraceCanLocationsService],
    })
], TraceCanLocationsModule);
//# sourceMappingURL=trace_can_locations.module.js.map