import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import TraceTrademark from "src/trace_models/trace_trademark.model";
import { GetTraceTrademarksDto } from "./dto/get-trace-trademarks.dto";
import sequelize from "sequelize";

@Injectable()
export class TraceTrademarksService {
  constructor(
    @InjectModel(TraceTrademark, "trace_connection")
    private traceTrademarksRepository: typeof TraceTrademark
  ) {}

  async getTrademarks(dto: GetTraceTrademarksDto) {
    interface CountResp {
      count: number;
    }

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

    const countResp: CountResp[] = await this.traceTrademarksRepository.sequelize.query(count_qry, {
      replacements: {
        productCode: `%${dto.filter.product_code}%`,
        productName: `%${dto.filter.product_name}%`,
        trademarkName: `%${dto.filter.trademark}%`,
      },
      type: sequelize.QueryTypes.SELECT,
    });

    const rowsResp = await this.traceTrademarksRepository.sequelize.query(row_qry, {
      replacements: {
        productCode: `%${dto.filter.product_code}%`,
        productName: `%${dto.filter.product_name}%`,
        trademarkName: `%${dto.filter.trademark}%`,
        offset: dto.limit * (dto.page - 1),
        limit: dto.limit,
      },
      type: sequelize.QueryTypes.SELECT,
    });

    return { total: countResp[0].count, rows: rowsResp };
  }
}
