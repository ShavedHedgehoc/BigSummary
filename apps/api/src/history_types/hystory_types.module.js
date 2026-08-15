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
exports.HistoryTypesModule = void 0;
const common_1 = require("@nestjs/common");
const history_types_controller_1 = require("./history_types.controller");
const history_types_service_1 = require("./history_types.service");
const sequelize_1 = require("@nestjs/sequelize");
const history_types_model_1 = __importDefault(require("./history_types.model"));
let HistoryTypesModule = class HistoryTypesModule {
};
exports.HistoryTypesModule = HistoryTypesModule;
exports.HistoryTypesModule = HistoryTypesModule = __decorate([
    (0, common_1.Module)({
        controllers: [history_types_controller_1.HistoryTypesController],
        providers: [history_types_service_1.HistoryTypesService],
        imports: [
            sequelize_1.SequelizeModule.forFeature([history_types_model_1.default]),
        ],
        exports: [history_types_service_1.HistoryTypesService],
    })
], HistoryTypesModule);
//# sourceMappingURL=hystory_types.module.js.map