"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestdbSqlService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = __importStar(require("sequelize"));
const xmljs = __importStar(require("xml-js"));
let TestdbSqlService = class TestdbSqlService {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    async getBatchs() {
        const countQry = `
        SELECT COUNT(*) as count
        FROM Batchs
    `;
        const countResp = await this.sequelize.query(countQry, {
            replacements: {},
            type: sequelize_2.default.QueryTypes.SELECT,
        });
        return { total: countResp[0].count };
    }
    async execInsertXML(dto) {
        const options = { compact: true };
        const xml = xmljs.js2xml(dto, options);
        const qry = `EXEC dbo.InsertBoilsXml2 @documentXml=:xml, @result=0; `;
        const [results, metadata] = await this.sequelize.query(qry, {
            replacements: {
                xml: xml,
                result: 0,
                type: sequelize_2.default.QueryTypes.SELECT,
            },
        });
        const normalized = Object.entries(results[0]).map(([key, value]) => ({
            value,
        }));
        return normalized[0];
    }
};
exports.TestdbSqlService = TestdbSqlService;
exports.TestdbSqlService = TestdbSqlService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectConnection)("trace_test_db_connection")),
    __metadata("design:paramtypes", [sequelize_2.Sequelize])
], TestdbSqlService);
//# sourceMappingURL=testdb_sql.service.js.map