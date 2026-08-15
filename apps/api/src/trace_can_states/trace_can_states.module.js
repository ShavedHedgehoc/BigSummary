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
exports.TraceCanStatesModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const trace_can_states_service_1 = require("./trace_can_states.service");
const trace_can_states_controller_1 = require("./trace_can_states.controller");
const trace_can_state_model_1 = __importDefault(require("../../../../../../../src/trace_models/trace_can_state.model"));
let TraceCanStatesModule = class TraceCanStatesModule {
};
exports.TraceCanStatesModule = TraceCanStatesModule;
exports.TraceCanStatesModule = TraceCanStatesModule = __decorate([
    (0, common_1.Module)({
        providers: [trace_can_states_service_1.TraceCanStatesService],
        imports: [sequelize_1.SequelizeModule.forFeature([trace_can_state_model_1.default], "trace_connection")],
        controllers: [trace_can_states_controller_1.TraceCanStatesController],
        exports: [trace_can_states_service_1.TraceCanStatesService],
    })
], TraceCanStatesModule);
//# sourceMappingURL=trace_can_states.module.js.map