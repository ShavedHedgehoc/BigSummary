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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const common_1 = require("@nestjs/common");
const bases_service_1 = require("./bases.service");
const update_base_dto_1 = require("./dto/update-base.dto");
let BaseController = class BaseController {
    constructor(basesService) {
        this.basesService = basesService;
    }
    getCurrentDocWithParams(dto) {
        return this.basesService.bulkUpdateBases(dto);
    }
};
exports.BaseController = BaseController;
__decorate([
    (0, common_1.Post)("/bulkupdate"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_base_dto_1.UpdateBaseDto]),
    __metadata("design:returntype", void 0)
], BaseController.prototype, "getCurrentDocWithParams", null);
exports.BaseController = BaseController = __decorate([
    (0, common_1.Controller)("bases"),
    __metadata("design:paramtypes", [bases_service_1.BasesService])
], BaseController);
//# sourceMappingURL=bases.controller.js.map