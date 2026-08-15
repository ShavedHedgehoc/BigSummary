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
exports.TraceCansController = void 0;
const common_1 = require("@nestjs/common");
const trace_cans_service_1 = require("./trace_cans.service");
const get_cans_list_dto_1 = require("./dto/get-cans-list.dto");
const get_cans_dto_1 = require("./dto/get-cans.dto");
let TraceCansController = class TraceCansController {
    constructor(cansService) {
        this.cansService = cansService;
    }
    getCans() {
        return this.cansService.getCans();
    }
    getCanVolumes() {
        return this.cansService.getVolumes();
    }
    getCansWithParams(dto) {
        return this.cansService.getCansWithParams(dto);
    }
    getCansList(dto) {
        return this.cansService.getCansList(dto);
    }
};
exports.TraceCansController = TraceCansController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TraceCansController.prototype, "getCans", null);
__decorate([
    (0, common_1.Get)("/volumes"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TraceCansController.prototype, "getCanVolumes", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_cans_dto_1.GetCansDto]),
    __metadata("design:returntype", void 0)
], TraceCansController.prototype, "getCansWithParams", null);
__decorate([
    (0, common_1.Post)("/list"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_cans_list_dto_1.GetCansListDto]),
    __metadata("design:returntype", void 0)
], TraceCansController.prototype, "getCansList", null);
exports.TraceCansController = TraceCansController = __decorate([
    (0, common_1.Controller)("trace-cans"),
    __metadata("design:paramtypes", [trace_cans_service_1.TraceCansService])
], TraceCansController);
//# sourceMappingURL=trace_cans.controller.js.map