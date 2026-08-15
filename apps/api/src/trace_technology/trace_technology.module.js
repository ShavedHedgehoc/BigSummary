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
exports.TraceTechnologyModule = void 0;
const common_1 = require("@nestjs/common");
const trace_technology_service_1 = require("./trace_technology.service");
const trace_technology_controller_1 = require("./trace_technology.controller");
const sequelize_1 = require("@nestjs/sequelize");
const trace_boil_record_model_1 = __importDefault(require("../../../../../../../src/trace_models/trace_boil_record.model"));
const trace_loads_module_1 = require("../../../../../../../src/trace_loads/trace_loads.module");
let TraceTechnologyModule = class TraceTechnologyModule {
};
exports.TraceTechnologyModule = TraceTechnologyModule;
exports.TraceTechnologyModule = TraceTechnologyModule = __decorate([
    (0, common_1.Module)({
        providers: [trace_technology_service_1.TraceTechnologyService],
        controllers: [trace_technology_controller_1.TraceTechnologyController],
        imports: [
            sequelize_1.SequelizeModule.forFeature([trace_boil_record_model_1.default], "trace_connection"),
            trace_loads_module_1.TraceLoadsModule,
        ],
        exports: [trace_technology_service_1.TraceTechnologyService],
    })
], TraceTechnologyModule);
//# sourceMappingURL=trace_technology.module.js.map