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
exports.DocsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const docs_service_1 = require("./docs.service");
const docs_model_1 = __importDefault(require("./docs.model"));
const create_doc_dto_1 = require("./dto/create-doc.dto");
const get_docs_dto_1 = require("./dto/get-docs.dto");
let DocsController = class DocsController {
    constructor(docsService) {
        this.docsService = docsService;
    }
    getAll() {
        return this.docsService.getAllDocs();
    }
    getCurrentDoc(id) {
        return this.docsService.deleteDoc(Number(id));
    }
    getAllWithParams(dto) {
        return this.docsService.getAllDocsWithFilter(dto);
    }
    getDocByid(docId) {
        return this.docsService.getDocById(Number(docId));
    }
    create(dto) {
        return this.docsService.createDoc(dto);
    }
};
exports.DocsController = DocsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить все сводки" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [docs_model_1.default] }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DocsController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Удалить сводку по id" }),
    (0, swagger_1.ApiResponse)({ status: 201 }),
    (0, common_1.Delete)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocsController.prototype, "getCurrentDoc", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить все документы с параметрами" }),
    (0, common_1.Post)("/get_all"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_docs_dto_1.GetDocsDto]),
    __metadata("design:returntype", void 0)
], DocsController.prototype, "getAllWithParams", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Получить сводку по id" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [docs_model_1.default] }),
    (0, common_1.Get)("/:docId"),
    __param(0, (0, common_1.Param)("docId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocsController.prototype, "getDocByid", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Создание новой сводки" }),
    (0, swagger_1.ApiResponse)({ status: 201, type: docs_model_1.default }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: "Сводка на эту площадку и дату уже существует",
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_doc_dto_1.CreateDocDto]),
    __metadata("design:returntype", void 0)
], DocsController.prototype, "create", null);
exports.DocsController = DocsController = __decorate([
    (0, swagger_1.ApiTags)("Сводки"),
    (0, common_1.Controller)("docs"),
    __metadata("design:paramtypes", [docs_service_1.DocsService])
], DocsController);
//# sourceMappingURL=docs.controller.js.map