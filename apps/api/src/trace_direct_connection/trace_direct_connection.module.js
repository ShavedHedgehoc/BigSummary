"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraceDirectConnectionModule = void 0;
const common_1 = require("@nestjs/common");
const trace_direct_connection_service_1 = require("./trace_direct_connection.service");
const trace_direct_connection_controller_1 = require("./trace_direct_connection.controller");
const sequelize_1 = require("@nestjs/sequelize");
let TraceDirectConnectionModule = class TraceDirectConnectionModule {
};
exports.TraceDirectConnectionModule = TraceDirectConnectionModule;
exports.TraceDirectConnectionModule = TraceDirectConnectionModule = __decorate([
    (0, common_1.Module)({
        providers: [trace_direct_connection_service_1.TraceDirectConnectionService],
        imports: [sequelize_1.SequelizeModule.forFeature([], "trace_connection")],
        controllers: [trace_direct_connection_controller_1.TraceDirectConnectionController],
        exports: [trace_direct_connection_service_1.TraceDirectConnectionService],
    })
], TraceDirectConnectionModule);
//# sourceMappingURL=trace_direct_connection.module.js.map