"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocsListModule = void 0;
const common_1 = require("@nestjs/common");
const docs_list_controller_1 = require("./docs.list.controller");
const docs_list_service_1 = require("./docs.list.service");
const records_module_1 = require("../../../../../../../src/records/records.module");
const docs_module_1 = require("../../../../../../../src/docs/docs.module");
const histories_module_1 = require("../../../../../../../src/histories/histories.module");
let DocsListModule = class DocsListModule {
};
exports.DocsListModule = DocsListModule;
exports.DocsListModule = DocsListModule = __decorate([
    (0, common_1.Module)({
        controllers: [docs_list_controller_1.DocsListController],
        providers: [docs_list_service_1.DocsListService],
        imports: [records_module_1.RecordsModule, docs_module_1.DocsModule, histories_module_1.HistoriesModule],
    })
], DocsListModule);
//# sourceMappingURL=docs.list.module.js.map