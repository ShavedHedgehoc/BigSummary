"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestdbSqlModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const testdb_sql_service_1 = require("./testdb_sql.service");
const testdb_sql_controller_1 = require("./testdb_sql.controller");
let TestdbSqlModule = class TestdbSqlModule {
};
exports.TestdbSqlModule = TestdbSqlModule;
exports.TestdbSqlModule = TestdbSqlModule = __decorate([
    (0, common_1.Module)({
        providers: [testdb_sql_service_1.TestdbSqlService],
        imports: [sequelize_1.SequelizeModule.forFeature([], "trace_test_db_connection")],
        controllers: [testdb_sql_controller_1.TestdbSqlController],
        exports: [testdb_sql_service_1.TestdbSqlService],
    })
], TestdbSqlModule);
//# sourceMappingURL=testdb_sql.module.js.map