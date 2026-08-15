"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoilsListModule = void 0;
const common_1 = require("@nestjs/common");
const boils_list_service_1 = require("./boils.list.service");
const boils_list_controller_1 = require("./boils.list.controller");
const boils_module_1 = require("../../../../../../../src/boils/boils.module");
const records_module_1 = require("../../../../../../../src/records/records.module");
const histories_module_1 = require("../../../../../../../src/histories/histories.module");
const bases_module_1 = require("../../../../../../../src/bases/bases.module");
const plants_module_1 = require("../../../../../../../src/plants/plants.module");
let BoilsListModule = class BoilsListModule {
};
exports.BoilsListModule = BoilsListModule;
exports.BoilsListModule = BoilsListModule = __decorate([
    (0, common_1.Module)({
        providers: [boils_list_service_1.BoilsListService],
        controllers: [boils_list_controller_1.BoilsListController],
        imports: [
            boils_module_1.BoilsModule,
            records_module_1.RecordsModule,
            histories_module_1.HistoriesModule,
            bases_module_1.BasesModule,
            plants_module_1.PlantsModule,
        ],
    })
], BoilsListModule);
//# sourceMappingURL=boils.list.module.js.map