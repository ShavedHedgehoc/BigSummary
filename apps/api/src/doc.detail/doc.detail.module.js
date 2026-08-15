"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocDetailModule = void 0;
const common_1 = require("@nestjs/common");
const doc_detail_service_1 = require("./doc.detail.service");
const doc_detail_controller_1 = require("./doc.detail.controller");
const docs_module_1 = require("../../../../../../../src/docs/docs.module");
const records_module_1 = require("../../../../../../../src/records/records.module");
const histories_module_1 = require("../../../../../../../src/histories/histories.module");
const semi_products_module_1 = require("../../../../../../../src/semi_products/semi_products.module");
const record_regulations_module_1 = require("../../../../../../../src/record_regulations/record_regulations.module");
const record_counters_module_1 = require("../../../../../../../src/record_counters/record_counters.module");
let DocDetailModule = class DocDetailModule {
};
exports.DocDetailModule = DocDetailModule;
exports.DocDetailModule = DocDetailModule = __decorate([
    (0, common_1.Module)({
        providers: [doc_detail_service_1.DocDetailService],
        controllers: [doc_detail_controller_1.DocDetailController],
        imports: [
            docs_module_1.DocsModule,
            records_module_1.RecordsModule,
            histories_module_1.HistoriesModule,
            semi_products_module_1.SemiProductsModule,
            record_regulations_module_1.RecordRegulationsModule,
            record_counters_module_1.RecordCountersModule,
        ],
    })
], DocDetailModule);
//# sourceMappingURL=doc.detail.module.js.map