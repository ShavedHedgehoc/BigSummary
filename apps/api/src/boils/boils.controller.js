"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoilsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_boil_dto_1 = require("./dto/create-boil.dto");
const boil_model_1 = __importDefault(require("./boil.model"));
const boils_service_1 = require("./boils.service");
let BoilsController = class BoilsController {
    constructor(boilsService) {
        this.boilsService = boilsService;
    }
    getAll() {
        return this.boilsService.getAllBoils();
    }
    create(dto) {
        return this.boilsService.getOrCreateByValue(dto.value);
    }
};
exports.BoilsController = BoilsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить все варки" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [boil_model_1.default] }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BoilsController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Создание новой варки" }),
    (0, swagger_1.ApiResponse)({ status: 201, type: boil_model_1.default }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_boil_dto_1.CreateBoilDto]),
    __metadata("design:returntype", void 0)
], BoilsController.prototype, "create", null);
exports.BoilsController = BoilsController = __decorate([
    (0, swagger_1.ApiTags)("Варки"),
    (0, common_1.Controller)("boils"),
    __metadata("design:paramtypes", [boils_service_1.BoilsService])
], BoilsController);
//# sourceMappingURL=boils.controller.js.map