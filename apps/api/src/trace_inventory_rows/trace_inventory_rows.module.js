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
exports.TraceInventoryRowsModule = void 0;
const common_1 = require("@nestjs/common");
const trace_inventory_rows_service_1 = require("./trace_inventory_rows.service");
const trace_inventory_rows_controller_1 = require("./trace_inventory_rows.controller");
const sequelize_1 = require("@nestjs/sequelize");
const trace_inventory_row_model_1 = __importDefault(require("../../../../../../../src/trace_models/trace_inventory_row.model"));
let TraceInventoryRowsModule = class TraceInventoryRowsModule {
};
exports.TraceInventoryRowsModule = TraceInventoryRowsModule;
exports.TraceInventoryRowsModule = TraceInventoryRowsModule = __decorate([
    (0, common_1.Module)({
        providers: [trace_inventory_rows_service_1.TraceInventoryRowsService],
        controllers: [trace_inventory_rows_controller_1.TraceInventoryRowsController],
        imports: [
            sequelize_1.SequelizeModule.forFeature([trace_inventory_row_model_1.default], "trace_connection"),
        ],
        exports: [trace_inventory_rows_service_1.TraceInventoryRowsService],
    })
], TraceInventoryRowsModule);
//# sourceMappingURL=trace_inventory_rows.module.js.map