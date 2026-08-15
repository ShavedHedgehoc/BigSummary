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
exports.ConveyorsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const conveyors_service_1 = require("./conveyors.service");
const conveyor_model_1 = __importDefault(require("./conveyor.model"));
const create_conveyor_dto_1 = require("./dto/create-conveyor.dto");
const update_conveyor_dto_1 = require("./dto/update-conveyor.dto");
const get_conveyors_dto_1 = require("./dto/get-conveyors.dto");
let ConveyorsController = class ConveyorsController {
    constructor(conveyorsService) {
        this.conveyorsService = conveyorsService;
    }
    getAllWithParams(dto) {
        return this.conveyorsService.getAllConveyorsWithParams(dto);
    }
    getbyBarcode(barcode) {
        return this.conveyorsService.getByBarcode(barcode);
    }
    create(dto) {
        return this.conveyorsService.createConveyor(dto);
    }
    updateEmploee(dto) {
        return this.conveyorsService.updateConveyor(dto);
    }
    deleteConveyorById(id) {
        return this.conveyorsService.deleteConveyor(Number(id));
    }
};
exports.ConveyorsController = ConveyorsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить все конвейера" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [conveyor_model_1.default] }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_conveyors_dto_1.GetConveyorsDto]),
    __metadata("design:returntype", void 0)
], ConveyorsController.prototype, "getAllWithParams", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить конвейер по штрихкоду" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [conveyor_model_1.default] }),
    (0, common_1.Get)("/barcode/:barcode"),
    __param(0, (0, common_1.Param)("barcode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConveyorsController.prototype, "getbyBarcode", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Создание нового конвейера" }),
    (0, swagger_1.ApiResponse)({ status: 201, type: conveyor_model_1.default }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_conveyor_dto_1.CreateConveyorDto]),
    __metadata("design:returntype", void 0)
], ConveyorsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Изменить конвейер" }),
    (0, swagger_1.ApiResponse)({ status: 201 }),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_conveyor_dto_1.UpdateConveyorDto]),
    __metadata("design:returntype", void 0)
], ConveyorsController.prototype, "updateEmploee", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Удалить конвейер по id" }),
    (0, swagger_1.ApiResponse)({ status: 201 }),
    (0, common_1.Delete)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConveyorsController.prototype, "deleteConveyorById", null);
exports.ConveyorsController = ConveyorsController = __decorate([
    (0, swagger_1.ApiTags)("Конвейеры"),
    (0, common_1.Controller)("conveyors"),
    __metadata("design:paramtypes", [conveyors_service_1.ConveyorsService])
], ConveyorsController);
//# sourceMappingURL=conveyors.controller.js.map