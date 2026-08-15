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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraceCanStatesController = void 0;
const common_1 = require("@nestjs/common");
const trace_can_states_service_1 = require("./trace_can_states.service");
let TraceCanStatesController = class TraceCanStatesController {
    constructor(traceCanStatesService) {
        this.traceCanStatesService = traceCanStatesService;
    }
    getAllStates() {
        return this.traceCanStatesService.getCanStates();
    }
};
exports.TraceCanStatesController = TraceCanStatesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TraceCanStatesController.prototype, "getAllStates", null);
exports.TraceCanStatesController = TraceCanStatesController = __decorate([
    (0, common_1.Controller)("trace-can-states"),
    __metadata("design:paramtypes", [trace_can_states_service_1.TraceCanStatesService])
], TraceCanStatesController);
//# sourceMappingURL=trace_can_states.controller.js.map