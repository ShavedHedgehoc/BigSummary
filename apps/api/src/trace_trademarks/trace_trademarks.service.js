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
exports.TraceTrademarksService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const trace_trademark_model_1 = __importDefault(require("../../../../../../../src/trace_models/trace_trademark.model"));
const sequelize_2 = __importDefault(require("sequelize"));
let TraceTrademarksService = class TraceTrademarksService {
    constructor(traceTrademarksRepository) {
        this.traceTrademarksRepository = traceTrademarksRepository;
    }
    async getTrademarks(dto) {
        const count_qry = `
    SELECT COUNT(*) AS count
      FROM (
        SELECT 1 as c
        FROM dbo.Lots l
        JOIN dbo.Products p   ON p.ProductId   = l.ProductId
        JOIN dbo.Trademarks t ON t.TrademarkPK = l.TradeMarkPK
        WHERE p.ProductId   LIKE :productCode
          AND p.ProductName LIKE :productName COLLATE Latin1_General_CI_AS
          AND t.TrademarkName LIKE :trademarkName COLLATE Latin1_General_CI_AS
        GROUP BY p.ProductId, t.TrademarkPK
      ) AS uniq_pairs;
    `;
        const row_qry = `
SELECT DISTINCT
  t.TrademarkName AS trademark_name,
  p.ProductId     AS product_id,
  p.ProductName   AS product_name
FROM dbo.Lots   l
JOIN dbo.Products   p ON p.ProductId = l.ProductId
JOIN dbo.Trademarks t ON t.TrademarkPK = l.TradeMarkPK
WHERE p.ProductId   LIKE :productCode
  AND p.ProductName LIKE :productName
  AND t.TrademarkName LIKE :trademarkName
ORDER BY t.TrademarkName ASC
OFFSET (:offset) ROWS
FETCH NEXT (:limit) ROWS ONLY;
`;
        const countResp = await this.traceTrademarksRepository.sequelize.query(count_qry, {
            replacements: {
                productCode: `%${dto.filter.product_code}%`,
                productName: `%${dto.filter.product_name}%`,
                trademarkName: `%${dto.filter.trademark}%`,
            },
            type: sequelize_2.default.QueryTypes.SELECT,
        });
        const rowsResp = await this.traceTrademarksRepository.sequelize.query(row_qry, {
            replacements: {
                productCode: `%${dto.filter.product_code}%`,
                productName: `%${dto.filter.product_name}%`,
                trademarkName: `%${dto.filter.trademark}%`,
                offset: dto.limit * (dto.page - 1),
                limit: dto.limit,
            },
            type: sequelize_2.default.QueryTypes.SELECT,
        });
        return { total: countResp[0].count, rows: rowsResp };
    }
};
exports.TraceTrademarksService = TraceTrademarksService;
exports.TraceTrademarksService = TraceTrademarksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(trace_trademark_model_1.default, "trace_connection")),
    __metadata("design:paramtypes", [Object])
], TraceTrademarksService);
//# sourceMappingURL=trace_trademarks.service.js.map