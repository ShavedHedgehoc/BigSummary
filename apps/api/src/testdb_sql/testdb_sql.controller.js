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
exports.TestdbSqlController = void 0;
const common_1 = require("@nestjs/common");
const testdb_sql_service_1 = require("./testdb_sql.service");
const swagger_1 = require("@nestjs/swagger");
const upload_boil_dto_1 = require("./dto/upload-boil-dto");
let TestdbSqlController = class TestdbSqlController {
    constructor(testsqlService) {
        this.testsqlService = testsqlService;
    }
    UploadBoil(dto) {
        return this.testsqlService.execInsertXML(dto);
    }
};
exports.TestdbSqlController = TestdbSqlController;
__decorate([
    (0, common_1.Post)("/"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [upload_boil_dto_1.UploadBoilDto]),
    __metadata("design:returntype", void 0)
], TestdbSqlController.prototype, "UploadBoil", null);
exports.TestdbSqlController = TestdbSqlController = __decorate([
    (0, swagger_1.ApiTags)("Testdb connection test"),
    (0, common_1.Controller)("testdb_sql"),
    __metadata("design:paramtypes", [testdb_sql_service_1.TestdbSqlService])
], TestdbSqlController);
//# sourceMappingURL=testdb_sql.controller.js.map