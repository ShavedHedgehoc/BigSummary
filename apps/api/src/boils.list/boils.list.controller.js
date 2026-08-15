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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoilsListController = void 0;
const common_1 = require("@nestjs/common");
const boils_list_service_1 = require("./boils.list.service");
const swagger_1 = require("@nestjs/swagger");
const get_boils_dto_1 = require("../../../../../../../src/boils/dto/get-boils.dto");
let BoilsListController = class BoilsListController {
    constructor(boilsListService) {
        this.boilsListService = boilsListService;
    }
    getAllWithParams(dto) {
        return this.boilsListService.getBoilsListWithFilter(dto);
    }
    getReportWithParams(dto) {
        return this.boilsListService.getBoilsReportWithFilter(dto);
    }
    getBoilById(boil_id) {
        return this.boilsListService.getBoilsListRow(Number(boil_id));
    }
};
exports.BoilsListController = BoilsListController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить все типы записей с параметрами" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof get_boils_dto_1.GetBoilsDto !== "undefined" && get_boils_dto_1.GetBoilsDto) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], BoilsListController.prototype, "getAllWithParams", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить все типы записей с параметрами" }),
    (0, common_1.Post)("/report"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof get_boils_dto_1.GetBoilsDto !== "undefined" && get_boils_dto_1.GetBoilsDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], BoilsListController.prototype, "getReportWithParams", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить запись по id" }),
    (0, common_1.Get)("/boil/:boil_id"),
    __param(0, (0, common_1.Param)("boil_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BoilsListController.prototype, "getBoilById", null);
exports.BoilsListController = BoilsListController = __decorate([
    (0, swagger_1.ApiTags)("Список основ"),
    (0, common_1.Controller)("boils_list"),
    __metadata("design:paramtypes", [boils_list_service_1.BoilsListService])
], BoilsListController);
//# sourceMappingURL=boils.list.controller.js.map