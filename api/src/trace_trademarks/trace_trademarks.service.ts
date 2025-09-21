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
    select count(tt.tn) as count
    from
    (SELECT 
      distinct t.TrademarkName as tn
	    ,t.TrademarkPK
	    ,p.ProductId
	    ,ProductName
    FROM [maindb].[dbo].[Lots] as l
    JOIN 
    Trademarks as t on t.TrademarkPK = l.TradeMarkPK
    JOIN 
    Products as p on p.ProductId = l.ProductId  
    WHERE 
    p.ProductId LIKE LOWER(:productCode)
    AND 
    p.ProductName LIKE LOWER(:productName)
    AND 
    t.TrademarkName LIKE LOWER(:trademarkName)
    ) as tt
    `;

    const row_qry = `
    SELECT 
      distinct t.TrademarkName as trademark_name	    
	    ,p.ProductId as product_id
	    ,ProductName as product_name
    FROM [maindb].[dbo].[Lots] as l
    JOIN 
    Trademarks as t on t.TrademarkPK = l.TradeMarkPK
    JOIN 
    Products as p on p.ProductId = l.ProductId  
    WHERE 
    p.ProductId LIKE LOWER(:productCode)
    AND 
    p.ProductName LIKE LOWER(:productName)
    AND 
    t.TrademarkName LIKE LOWER(:trademarkName)
    ORDER BY trademark_name ASC
    OFFSET (:offset) ROWS   
    FETCH NEXT (:limit) ROWS ONLY
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
