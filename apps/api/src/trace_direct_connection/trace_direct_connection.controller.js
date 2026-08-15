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
exports.TraceDirectConnectionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const upload_boil_dto_1 = require("./dto/upload-boil-dto");
const trace_direct_connection_service_1 = require("./trace_direct_connection.service");
let TraceDirectConnectionController = class TraceDirectConnectionController {
    constructor(traceDirectConnectionlService) {
        this.traceDirectConnectionlService = traceDirectConnectionlService;
    }
    UploadBoil(dto) {
        return this.traceDirectConnectionlService.execInsertXML(dto);
    }
};
exports.TraceDirectConnectionController = TraceDirectConnectionController;
__decorate([
    (0, common_1.Post)("/"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [upload_boil_dto_1.UploadBoilDto]),
    __metadata("design:returntype", void 0)
], TraceDirectConnectionController.prototype, "UploadBoil", null);
exports.TraceDirectConnectionController = TraceDirectConnectionController = __decorate([
    (0, swagger_1.ApiTags)("Maindb direct connection"),
    (0, common_1.Controller)("trace-direct-connection"),
    __metadata("design:paramtypes", [trace_direct_connection_service_1.TraceDirectConnectionService])
], TraceDirectConnectionController);
//# sourceMappingURL=trace_direct_connection.controller.js.map