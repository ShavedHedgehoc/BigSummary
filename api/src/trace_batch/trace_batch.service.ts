import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import TraceBatch from "../trace_models/trace_batch.model";
import sequelize, { col, literal } from "sequelize";
import { GetTraceBatchsDto } from "./dto/get-trace-batchs.dto";
import TraceBtProduct from "src/trace_models/trace_bt_product.model";
import TraceProduct from "src/trace_models/trace_product.model";
import { GetTraceBatchsWghtReportDto } from "./dto/get-trace-batchs-wght-report.dto";

export interface TraceBatchByIdResp {}

@Injectable()
export class TraceBatchService {
  constructor(@InjectModel(TraceBatch, "trace_connection") private traceBatchRepository: typeof TraceBatch) {}

  async getByName(batchName: string): Promise<TraceBatch> {
    const traceBatch = await this.traceBatchRepository.findOne<TraceBatch>({ where: { BatchName: batchName } });
    if (!traceBatch) {
      throw new HttpException("Партия не найдена", HttpStatus.NOT_FOUND);
    }
    return traceBatch;
  }

  async getById(id: number): Promise<any> {
    const traceBatch = await this.traceBatchRepository.findOne({
      attributes: [
        [col("TraceBatch.BatchPK"), "batch_id"],
        [col("BatchName"), "batch_name"],
        [col("BatchDate"), "date"],
        [literal("CASE WHEN Plant = 'П' THEN 'Пискаревка' WHEN Plant = 'К' THEN 'Колпино' ELSE '' END"), "plant"],
        [col("bt_products.trace_product.ProductId"), "product_id"],
        [col("bt_products.trace_product.ProductMarking"), "marking"],
      ],
      where: { BatchPK: id },
      include: [
        {
          model: TraceBtProduct,
          as: "bt_products",
          attributes: [],
          include: [{ model: TraceProduct, as: "trace_product" }],
        },
      ],
    });
    if (!traceBatch) {
      throw new HttpException("Партия не найдена", HttpStatus.NOT_FOUND);
    }
    return traceBatch;
  }

  async getBatchs(dto: GetTraceBatchsDto) {
    interface CountResp {
      count: number;
    }

    const count_query = `
    SELECT
        COUNT(TMP_QRY_3.batch_id) as 'count'
    FROM
        (SELECT
            TMP_QRY_2.*
        FROM
            (SELECT
                TMP_QRY.*
            FROM
                (SELECT
                    Batchs.BatchPK as 'batch_id',
                    Batchs.BatchName as 'batch_name',
                    Batchs.BatchDate as 'batch_date',
                    Batchs.Plant as 'plant',
                    CASE
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='A' THEN 'A'
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='B' THEN 'B'
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='C' THEN 'C'
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='D' THEN 'D'
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='E' THEN 'E'
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='F' THEN 'F'
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='G' THEN 'G'
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='H' THEN 'H'
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='I' THEN 'I'
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='J' THEN 'J'
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='K' THEN 'K'
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='L' THEN 'L'
                    ELSE 
                        CASE
                            WHEN 
                                SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='X' 
                            THEN 
                                SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)
                            WHEN 
                                SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='Y' 
                            THEN 
                                SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)
                            WHEN 
                                SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='Z' 
                            THEN 
                                SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)
                            WHEN 
                                SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,2)='RS' 
                            THEN 
                                SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-3,1)
                            WHEN 
                                SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,2)='SR' 
                            THEN 
                                SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-3,1)
                            WHEN 
                                SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='S' 
                            THEN 
                                SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)
                            WHEN 
                                SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='A' 
                            THEN 
                                SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)
                            WHEN 
                                SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='R' 
                            THEN 
                                SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)
                            ELSE 'XZ'
                        END
                    END AS 'batch_month',
                    CASE        
                        WHEN
                            SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='7'
                        THEN
                            CAST('2017' AS INT)
                        WHEN
                            SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='8'
                        THEN
                            CAST('2018' AS INT)
                        WHEN
                            SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='9'
                        THEN
                            CAST('2019' AS INT)    
                        WHEN
                            SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='X'
                        THEN
                            CAST ('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
                        WHEN
                            SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='Y'
                        THEN
                            CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
                        WHEN
                            SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='Z'
                        THEN
                            CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
                        WHEN
                            SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,2)='RS'
                        THEN
                            CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-2,1) AS INT)
                        WHEN
                            SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,2)='SR'
                        THEN
                            CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-2,1) AS INT)
                        WHEN
                            SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='S'
                        THEN
                            CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
                        WHEN
                            SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='A'
                        THEN
                            CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
                        WHEN
                            SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='R'
                        THEN
                            CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
                        ELSE
                            CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1) AS INT)            
                    END AS 'batch_year',
                    CASE        
                        WHEN
                            SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='X'
                        THEN
                            CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
                        WHEN
                            SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='Y'
                        THEN
                            CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
                        WHEN
                            SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='Z'
                        THEN
                            CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
                        WHEN
                            SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,2)='RS'
                        THEN
                            CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-3) AS INT)
                        WHEN
                            SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,2)='SR'
                        THEN
                            CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-3) AS INT)
                        WHEN
                            SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='S'
                        THEN
                            CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
                        WHEN
                            SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='A'
                        THEN
                            CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
                        WHEN
                            SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='R'
                        THEN
                            CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
                        ELSE
                            CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-1) AS INT)
                    END AS 'batch_number'
                FROM
                    Batchs
                WHERE
                    ((:batch)='' OR Batchs.BatchName LIKE '%'+(:batch)+'%')
                    AND
                    ((:start_date)=''OR Batchs.BatchDate >= (:start_date))
                    AND
                    ((:end_date)=''OR Batchs.BatchDate <= (:end_date))
                    AND
                    ((:plant)=''OR Batchs.Plant = (:plant))
                ) AS TMP_QRY
            WHERE
                ((:month)='' OR TMP_QRY.batch_month=(:month))
                AND
                ((:year)='' OR TMP_QRY.batch_year=CAST((:year) AS INT))    
            ) AS TMP_QRY_2        
        ) AS TMP_QRY_3
        LEFT JOIN
        BtProducts
        ON 
            TMP_QRY_3.batch_id = BtProducts .BatchPK
        LEFT JOIN
        Products ON Products.ProductId = BtProducts.ProductId
    WHERE 
            ((:marking) IS NULL OR Products.ProductMarking like '%'+(:marking)+'%')
    `;
    const row_query = `
        SELECT
            TMP_QRY_3.batch_id as 'batch_id',
            TMP_QRY_3.batch_name as 'batch_name',
            TMP_QRY_3.batch_date as 'date',
            Plants.PlantName as 'plant',
            Products.ProductId as 'product_id',
            Products.ProductMarking as 'marking'
        FROM
            (SELECT
                TMP_QRY_2.*
            FROM
                (SELECT
                    TMP_QRY.*
                FROM
                    (SELECT
                        Batchs.BatchPK as 'batch_id',
                        Batchs.BatchName as 'batch_name',
                        Batchs.BatchDate as 'batch_date',
                        Batchs.Plant as 'plant',
                        CASE
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='A' THEN 'A'
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='B' THEN 'B'
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='C' THEN 'C'
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='D' THEN 'D'
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='E' THEN 'E'
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='F' THEN 'F'
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='G' THEN 'G'
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='H' THEN 'H'
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='I' THEN 'I'
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='J' THEN 'J'
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='K' THEN 'K'
                        WHEN
                            SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='L' THEN 'L'
                        ELSE 
                            CASE
                                WHEN 
                                    SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='X' 
                                THEN 
                                    SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)
                                WHEN 
                                    SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='Y' 
                                THEN 
                                    SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)
                                WHEN 
                                    SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='Z' 
                                THEN 
                                    SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)
                                WHEN 
                                    SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,2)='RS' 
                                THEN 
                                    SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-3,1)
                                WHEN 
                                    SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,2)='SR' 
                                THEN 
                                    SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-3,1)
                                WHEN 
                                    SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='S' 
                                THEN 
                                    SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)
                                WHEN 
                                    SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='A' 
                                THEN 
                                    SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)
                                WHEN 
                                    SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='R' 
                                THEN 
                                    SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)
                                ELSE 'XZ'
                            END
                        END AS 'batch_month',
                        CASE        
                        WHEN
                        SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='7'
                        THEN
                        CAST('2017' AS INT)
                        WHEN
                        SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='8'
                        THEN
                        CAST('2018' AS INT)
                        WHEN
                        SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='9'
                        THEN
                        CAST('2019' AS INT)    
                        WHEN
                        SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='X'
                        THEN
                        CAST ('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
                        WHEN
                        SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='Y'
                        THEN
                        CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
                        WHEN
                        SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='Z'
                        THEN
                        CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
                        WHEN
                        SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,2)='RS'
                        THEN
                        CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-2,1) AS INT)
                        WHEN
                        SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,2)='SR'
                        THEN
                        CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-2,1) AS INT)
                        WHEN
                        SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='S'
                        THEN
                        CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
                        WHEN
                        SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='A'
                        THEN
                        CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
                        WHEN
                        SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='R'
                        THEN
                        CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
                        ELSE
                        CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1) AS INT)            
                        END AS 'batch_year',
                        CASE        
                        WHEN
                        SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='X'
                        THEN
                        CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
                        WHEN
                        SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='Y'
                        THEN
                        CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
                        WHEN
                        SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='Z'
                        THEN
                        CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
                        WHEN
                        SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,2)='RS'
                        THEN
                        CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-3) AS INT)
                        WHEN
                        SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,2)='SR'
                        THEN
                        CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-3) AS INT)
                        WHEN
                        SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='S'
                        THEN
                        CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
                        WHEN
                        SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='A'
                        THEN
                        CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
                        WHEN
                        SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='R'
                        THEN
                        CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
                        ELSE
                        CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-1) AS INT)
                        END AS 'batch_number'
                    FROM
                        Batchs
                    WHERE
                        ((:batch)='' OR Batchs.BatchName LIKE '%'+(:batch)+'%')
                        AND
                        ((:start_date)=''OR Batchs.BatchDate >= (:start_date))
                        AND
                        ((:end_date)=''OR Batchs.BatchDate <= (:end_date))
                        AND
                        ((:plant)=''OR Batchs.Plant = (:plant))
                    ) AS TMP_QRY
                WHERE
                ((:month)='' OR TMP_QRY.batch_month=(:month))
                    AND
                    ((:year)='' OR TMP_QRY.batch_year=CAST((:year) AS INT))    
                ) AS TMP_QRY_2        
                ) AS TMP_QRY_3
            LEFT JOIN
            BtProducts
            ON 
            TMP_QRY_3.batch_id = BtProducts .BatchPK
            LEFT JOIN
            Products ON Products.ProductId = BtProducts.ProductId
            LEFT JOIN
            Plants ON Plants.PlantAlias = TMP_QRY_3.plant
        WHERE 
            ((:marking) IS NULL OR Products.ProductMarking like '%'+(:marking)+'%')
        ORDER BY 
            TMP_QRY_3.batch_year ASC, 
            TMP_QRY_3.batch_month ASC, 
            TMP_QRY_3.batch_number ASC
        OFFSET (:offset) ROWS
        FETCH NEXT (:limit) ROWS ONLY
    `;

    const countResp: CountResp[] = await this.traceBatchRepository.sequelize.query(count_query, {
      replacements: {
        batch: dto.filter.batch,
        start_date: dto.filter.startDate,
        end_date: dto.filter.endDate,
        plant: dto.filter.plants.length ? dto.filter.plants[0] : "",
        marking: dto.filter.marking,
        month: dto.filter.month,
        year: dto.filter.year,
      },
      type: sequelize.QueryTypes.SELECT,
    });

    const rowsResp = await this.traceBatchRepository.sequelize.query(row_query, {
      replacements: {
        batch: dto.filter.batch,
        start_date: dto.filter.startDate,
        end_date: dto.filter.endDate,
        plant: dto.filter.plants.length ? dto.filter.plants[0] : "",
        marking: dto.filter.marking,
        month: dto.filter.month,
        year: dto.filter.year,
        offset: dto.limit * (dto.page - 1),
        limit: dto.limit,
      },
      type: sequelize.QueryTypes.SELECT,
    });

    return { total: countResp[0].count, rows: rowsResp };
  }

  async getBatchData(id: number) {
    const summary_qry = `
    SELECT
      boils_qry.product_id as 'b_product_id'
      , boils_qry.product_name as 'b_product_name'
      , boils_qry.plan_q as 'plan_q'
      , wgh_qry.product_id as 'w_product_id'
      , wgh_qry.product_name as 'w_product_name'
      , wgh_qry.fact as 'fact_q'
    FROM
        (
        (SELECT
            Boils.BatchPK as 'batch_id'
                , Boils.ProductId as 'product_id'
                , Products.ProductName as 'product_name' 
                , SUM(Boils.Quantity) as 'plan_q'
        FROM
            Boils
            JOIN
            Products
            ON
                Products.ProductId= Boils.ProductId
        WHERE
                Boils.BatchPK = (:batch_id)
        GROUP BY 
                Boils.BatchPK,Boils.ProductId,Products.ProductName 
            ) as boils_qry
        FULL JOIN
        (SELECT
            Weightings.BatchPK
                , Weightings.ProductId as 'product_id'
                , Products.ProductName as 'product_name' 
                , SUM(Weightings.Quantity) as 'fact'
        FROM Weightings
            LEFT JOIN
            Products
            ON 
                Products.ProductId = Weightings.ProductId
        WHERE
                Weightings.BatchPK=(:batch_id)
        GROUP BY 
                Weightings.BatchPK,Weightings.ProductId,Products.ProductName 
            ) AS wgh_qry
        ON 
            wgh_qry.product_id= boils_qry.product_id
        )
    ORDER BY
        CASE
            WHEN
                boils_qry.product_name !=''
            THEN
                boils_qry.product_name 
            ELSE
                wgh_qry.product_name 
        END
    ASC
    `;
    const summaryData = await this.traceBatchRepository.sequelize.query(summary_qry, {
      replacements: {
        batch_id: id,
      },
      type: sequelize.QueryTypes.SELECT,
    });
    return { summary_data: summaryData };
  }

  async getBatchsWghtReport(dto: GetTraceBatchsWghtReportDto) {
    interface CountResp {
      count: number;
    }

    const count_query = `
    SELECT COUNT(*) as 'count'
        FROM (
                (
                    SELECT Batchs.BatchName as 'batch_name',
                        Boils.BatchPK as 'batch_id',
                        Boils.ProductId as 'product_id',
                        Products.ProductName as 'product_name',
                        SUM(Boils.Quantity) as 'plan_q'
                    FROM Boils
                        LEFT JOIN Products ON Products.ProductId = Boils.ProductId
                        JOIN Batchs ON Batchs.BatchPK = Boils.BatchPK
                    WHERE Boils.BatchPK IN (
                            SELECT Batchs.BatchPK
                            FROM Batchs
                            WHERE BatchDate = (:batchDate)
                                AND Batchs.BatchName LIKE '%' + (:batchName) + '%'
                                AND ((:plant)=''OR Batchs.Plant = (:plant))
                        )
                        AND Products.ProductId LIKE '%' + (:productId) + '%'
                    GROUP BY Batchs.BatchName,
                        Boils.BatchPK,
                        Boils.ProductId,
                        Products.ProductName
                ) AS boils_qry
                FULL JOIN (
                    SELECT Batchs.BatchName as 'batch_name',
                        Weightings.BatchPK as 'batch_id',
                        Weightings.ProductId as 'product_id',
                        Products.ProductName as 'product_name',
                        SUM(Weightings.Quantity) as 'fact'
                    FROM Weightings
                        LEFT JOIN Products ON Products.ProductId = Weightings.ProductId
                        JOIN Batchs ON Batchs.BatchPK = Weightings.BatchPK
                    WHERE Weightings.BatchPK IN (
                            SELECT Batchs.BatchPK
                            FROM Batchs
                            WHERE BatchDate = (:batchDate)
                                AND Batchs.BatchName LIKE '%' + (:batchName) + '%'
                                AND ((:plant)=''OR Batchs.Plant = (:plant))
                        )
                        AND Products.ProductId like '%' + (:productId) + '%'
                    GROUP BY Batchs.BatchName,
                        Weightings.BatchPK,
                        Weightings.ProductId,
                        Products.ProductName
                ) AS wgh_qry ON wgh_qry.product_id = boils_qry.product_id
                AND wgh_qry.batch_id = boils_qry.batch_id
            )
        WHERE (:compare)='false' OR (plan_q != fact
            OR plan_q IS NULL
            OR fact IS NULL)
    `;
    const row_query = `
            SELECT RESULT_QUERY.*,Plants.PlantName as 'plant_name',
            CASE
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'A' THEN 'A'
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'B' THEN 'B'
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'C' THEN 'C'
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'D' THEN 'D'
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'E' THEN 'E'
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'F' THEN 'F'
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'G' THEN 'G'
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'H' THEN 'H'
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'I' THEN 'I'
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'J' THEN 'J'
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'K' THEN 'K'
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'L' THEN 'L'
                ELSE CASE
                    WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'X' THEN SUBSTRING (res_batch_name, LEN (res_batch_name) -2, 1)
                    WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'Y' THEN SUBSTRING (res_batch_name, LEN (res_batch_name) -2, 1)
                    WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'Z' THEN SUBSTRING (res_batch_name, LEN (res_batch_name) -2, 1)
                    WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 2) = 'RS' THEN SUBSTRING (res_batch_name, LEN (res_batch_name) -3, 1)
                    WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 2) = 'SR' THEN SUBSTRING (res_batch_name, LEN (res_batch_name) -3, 1)
                    WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'S' THEN SUBSTRING (res_batch_name, LEN (res_batch_name) -2, 1)
                    WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'A' THEN SUBSTRING (res_batch_name, LEN (res_batch_name) -2, 1)
                    WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'R' THEN SUBSTRING (res_batch_name, LEN (res_batch_name) -2, 1)
                    ELSE 'XZ'
                END
            END AS 'batch_month',
            CASE
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = '7' THEN CAST ('2017' AS INT)
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = '8' THEN CAST ('2018' AS INT)
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = '9' THEN CAST ('2019' AS INT)
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'X' THEN CAST (
                    '202' + SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'Y' THEN CAST (
                    '202' + SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'Z' THEN CAST (
                    '202' + SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 2) = 'RS' THEN CAST (
                    '202' + SUBSTRING (res_batch_name, LEN (res_batch_name) -2, 1) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 2) = 'SR' THEN CAST (
                    '202' + SUBSTRING (res_batch_name, LEN (res_batch_name) -2, 1) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'S' THEN CAST (
                    '202' + SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'A' THEN CAST (
                    '202' + SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'R' THEN CAST (
                    '202' + SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) AS INT
                )
                ELSE CAST (
                    '202' + SUBSTRING (res_batch_name, LEN (res_batch_name), 1) AS INT
                )
            END AS 'batch_year',
            CASE
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'X' THEN CAST (
                    SUBSTRING (res_batch_name, 0, LEN (res_batch_name) -2) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'Y' THEN CAST (
                    SUBSTRING (res_batch_name, 0, LEN (res_batch_name) -2) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'Z' THEN CAST (
                    SUBSTRING (res_batch_name, 0, LEN (res_batch_name) -2) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 2) = 'RS' THEN CAST (
                    SUBSTRING (res_batch_name, 0, LEN (res_batch_name) -3) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 2) = 'SR' THEN CAST (
                    SUBSTRING (res_batch_name, 0, LEN (res_batch_name) -3) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'S' THEN CAST (
                    SUBSTRING (res_batch_name, 0, LEN (res_batch_name) -2) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'A' THEN CAST (
                    SUBSTRING (res_batch_name, 0, LEN (res_batch_name) -2) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'R' THEN CAST (
                    SUBSTRING (res_batch_name, 0, LEN (res_batch_name) -2) AS INT
                )
                ELSE CAST (
                    SUBSTRING (res_batch_name, 0, LEN (res_batch_name) -1) AS INT
                )
            END AS 'batch_number'
        FROM(
                SELECT 
                    CASE
                        WHEN boils_qry.batch_name != '' THEN boils_qry.batch_name
                        ELSE wgh_qry.batch_name
                    END AS 'res_batch_name', 
                    CASE
                        WHEN boils_qry.batch_date != '' THEN boils_qry.batch_date
                        ELSE wgh_qry.batch_date
                    END AS 'res_batch_date', 
                    CASE
                        WHEN boils_qry.b_plant != '' THEN boils_qry.b_plant
                        ELSE wgh_qry.w_plant
                    END AS 'res_plant',                                              
                    boils_qry.product_id as 'b_product_id',
                    boils_qry.product_name as 'b_product_name',
                    boils_qry.plan_q as 'res_plan',            
                    wgh_qry.product_id as 'w_product_id',
                    wgh_qry.product_name as 'w_product_name',
                    wgh_qry.fact as 'res_fact'
                FROM (
                        (
                            SELECT Batchs.BatchName as 'batch_name',
                                Batchs.Plant as 'b_plant',
                                Batchs.BatchDate as 'batch_date',
                                Boils.BatchPK as 'batch_id',
                                Boils.ProductId as 'product_id',
                                Products.ProductName as 'product_name',
                                SUM(Boils.Quantity) as 'plan_q'
                            FROM Boils
                                LEFT JOIN Products ON Products.ProductId = Boils.ProductId
                                JOIN Batchs ON Batchs.BatchPK = Boils.BatchPK
                            WHERE Boils.BatchPK IN (
                                    SELECT Batchs.BatchPK
                                    FROM Batchs
                                    WHERE BatchDate = (:batchDate)
                                        AND Batchs.BatchName LIKE '%' + (:batchName) + '%'
                                        AND ((:plant)=''OR Batchs.Plant = (:plant))
                                )
                                AND Products.ProductId LIKE '%' + (:productId) + '%'
                            GROUP BY Batchs.BatchName,
                                Batchs.Plant,
                                Batchs.BatchDate,
                                Boils.BatchPK,
                                Boils.ProductId,
                                Products.ProductName
                        ) AS boils_qry
                        FULL JOIN (
                            SELECT Batchs.BatchName as 'batch_name',
                                Batchs.Plant as 'w_plant',
                                Batchs.BatchDate as 'batch_date',
                                Weightings.BatchPK as 'batch_id',
                                Weightings.ProductId as 'product_id',
                                Products.ProductName as 'product_name',
                                SUM(Weightings.Quantity) as 'fact'
                            FROM Weightings
                                LEFT JOIN Products ON Products.ProductId = Weightings.ProductId
                                JOIN Batchs ON Batchs.BatchPK = Weightings.BatchPK
                            WHERE Weightings.BatchPK IN (
                                    SELECT Batchs.BatchPK
                                    FROM Batchs
                                    WHERE BatchDate = (:batchDate)
                                        AND Batchs.BatchName LIKE '%' + (:batchName) + '%'
                                        AND ((:plant)=''OR Batchs.Plant = (:plant))
                                )
                                AND Products.ProductId like '%' + (:productId) + '%'
                            GROUP BY Batchs.BatchName,
                                Batchs.Plant,
                                Batchs.BatchDate,
                                Weightings.BatchPK,
                                Weightings.ProductId,
                                Products.ProductName
                        ) AS wgh_qry ON wgh_qry.product_id = boils_qry.product_id
                        AND wgh_qry.batch_id = boils_qry.batch_id
                    )
                WHERE (:compare)='false' OR (plan_q != fact
                    OR plan_q IS NULL
                    OR fact IS NULL)
            ) as RESULT_QUERY
        LEFT JOIN
            Plants ON Plants.PlantAlias = RESULT_QUERY.res_plant
        ORDER BY 
            CASE
                WHEN RESULT_QUERY.b_product_name != '' THEN RESULT_QUERY.b_product_name
				ELSE RESULT_QUERY.w_product_name
            END ASC,            
            batch_year ASC,
            batch_month ASC,
            batch_number ASC
        OFFSET (:offset) ROWS 
        FETCH NEXT (:limit) ROWS ONLY
    `;

    const row_query_by_batch = `
            SELECT RESULT_QUERY.*,Plants.PlantName as 'plant_name',
            CASE
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'A' THEN 'A'
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'B' THEN 'B'
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'C' THEN 'C'
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'D' THEN 'D'
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'E' THEN 'E'
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'F' THEN 'F'
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'G' THEN 'G'
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'H' THEN 'H'
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'I' THEN 'I'
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'J' THEN 'J'
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'K' THEN 'K'
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) = 'L' THEN 'L'
                ELSE CASE
                    WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'X' THEN SUBSTRING (res_batch_name, LEN (res_batch_name) -2, 1)
                    WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'Y' THEN SUBSTRING (res_batch_name, LEN (res_batch_name) -2, 1)
                    WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'Z' THEN SUBSTRING (res_batch_name, LEN (res_batch_name) -2, 1)
                    WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 2) = 'RS' THEN SUBSTRING (res_batch_name, LEN (res_batch_name) -3, 1)
                    WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 2) = 'SR' THEN SUBSTRING (res_batch_name, LEN (res_batch_name) -3, 1)
                    WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'S' THEN SUBSTRING (res_batch_name, LEN (res_batch_name) -2, 1)
                    WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'A' THEN SUBSTRING (res_batch_name, LEN (res_batch_name) -2, 1)
                    WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'R' THEN SUBSTRING (res_batch_name, LEN (res_batch_name) -2, 1)
                    ELSE 'XZ'
                END
            END AS 'batch_month',
            CASE
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = '7' THEN CAST ('2017' AS INT)
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = '8' THEN CAST ('2018' AS INT)
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = '9' THEN CAST ('2019' AS INT)
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'X' THEN CAST (
                    '202' + SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'Y' THEN CAST (
                    '202' + SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'Z' THEN CAST (
                    '202' + SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 2) = 'RS' THEN CAST (
                    '202' + SUBSTRING (res_batch_name, LEN (res_batch_name) -2, 1) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 2) = 'SR' THEN CAST (
                    '202' + SUBSTRING (res_batch_name, LEN (res_batch_name) -2, 1) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'S' THEN CAST (
                    '202' + SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'A' THEN CAST (
                    '202' + SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'R' THEN CAST (
                    '202' + SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 1) AS INT
                )
                ELSE CAST (
                    '202' + SUBSTRING (res_batch_name, LEN (res_batch_name), 1) AS INT
                )
            END AS 'batch_year',
            CASE
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'X' THEN CAST (
                    SUBSTRING (res_batch_name, 0, LEN (res_batch_name) -2) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'Y' THEN CAST (
                    SUBSTRING (res_batch_name, 0, LEN (res_batch_name) -2) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'Z' THEN CAST (
                    SUBSTRING (res_batch_name, 0, LEN (res_batch_name) -2) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 2) = 'RS' THEN CAST (
                    SUBSTRING (res_batch_name, 0, LEN (res_batch_name) -3) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name) -1, 2) = 'SR' THEN CAST (
                    SUBSTRING (res_batch_name, 0, LEN (res_batch_name) -3) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'S' THEN CAST (
                    SUBSTRING (res_batch_name, 0, LEN (res_batch_name) -2) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'A' THEN CAST (
                    SUBSTRING (res_batch_name, 0, LEN (res_batch_name) -2) AS INT
                )
                WHEN SUBSTRING (res_batch_name, LEN (res_batch_name), 1) = 'R' THEN CAST (
                    SUBSTRING (res_batch_name, 0, LEN (res_batch_name) -2) AS INT
                )
                ELSE CAST (
                    SUBSTRING (res_batch_name, 0, LEN (res_batch_name) -1) AS INT
                )
            END AS 'batch_number'
        FROM(
                SELECT 
                    CASE
                        WHEN boils_qry.batch_name != '' THEN boils_qry.batch_name
                        ELSE wgh_qry.batch_name
                    END AS 'res_batch_name', 
                    CASE
                        WHEN boils_qry.batch_date != '' THEN boils_qry.batch_date
                        ELSE wgh_qry.batch_date
                    END AS 'res_batch_date', 
                    CASE
                        WHEN boils_qry.b_plant != '' THEN boils_qry.b_plant
                        ELSE wgh_qry.w_plant
                    END AS 'res_plant',                                              
                    boils_qry.product_id as 'b_product_id',
                    boils_qry.product_name as 'b_product_name',
                    boils_qry.plan_q as 'res_plan',            
                    wgh_qry.product_id as 'w_product_id',
                    wgh_qry.product_name as 'w_product_name',
                    wgh_qry.fact as 'res_fact'
                FROM (
                        (
                            SELECT Batchs.BatchName as 'batch_name',
                                Batchs.Plant as 'b_plant',
                                Batchs.BatchDate as 'batch_date',
                                Boils.BatchPK as 'batch_id',
                                Boils.ProductId as 'product_id',
                                Products.ProductName as 'product_name',
                                SUM(Boils.Quantity) as 'plan_q'
                            FROM Boils
                                LEFT JOIN Products ON Products.ProductId = Boils.ProductId
                                JOIN Batchs ON Batchs.BatchPK = Boils.BatchPK
                            WHERE Boils.BatchPK IN (
                                    SELECT Batchs.BatchPK
                                    FROM Batchs
                                    WHERE BatchDate = (:batchDate)
                                        AND Batchs.BatchName LIKE '%' + (:batchName) + '%'
                                        AND ((:plant)=''OR Batchs.Plant = (:plant))
                                )
                                AND Products.ProductId LIKE '%' + (:productId) + '%'
                            GROUP BY Batchs.BatchName,
                                Batchs.Plant,
                                Batchs.BatchDate,
                                Boils.BatchPK,
                                Boils.ProductId,
                                Products.ProductName
                        ) AS boils_qry
                        FULL JOIN (
                            SELECT Batchs.BatchName as 'batch_name',
                                Batchs.Plant as 'w_plant',
                                Batchs.BatchDate as 'batch_date',
                                Weightings.BatchPK as 'batch_id',
                                Weightings.ProductId as 'product_id',
                                Products.ProductName as 'product_name',
                                SUM(Weightings.Quantity) as 'fact'
                            FROM Weightings
                                LEFT JOIN Products ON Products.ProductId = Weightings.ProductId
                                JOIN Batchs ON Batchs.BatchPK = Weightings.BatchPK
                            WHERE Weightings.BatchPK IN (
                                    SELECT Batchs.BatchPK
                                    FROM Batchs
                                    WHERE BatchDate = (:batchDate)
                                        AND Batchs.BatchName LIKE '%' + (:batchName) + '%'
                                        AND ((:plant)=''OR Batchs.Plant = (:plant))
                                )
                                AND Products.ProductId like '%' + (:productId) + '%'
                            GROUP BY Batchs.BatchName,
                                Batchs.Plant,
                                Batchs.BatchDate,
                                Weightings.BatchPK,
                                Weightings.ProductId,
                                Products.ProductName
                        ) AS wgh_qry ON wgh_qry.product_id = boils_qry.product_id
                        AND wgh_qry.batch_id = boils_qry.batch_id
                    )
                WHERE (:compare)='false' OR (plan_q != fact
                    OR plan_q IS NULL
                    OR fact IS NULL)
            ) as RESULT_QUERY
        LEFT JOIN
            Plants ON Plants.PlantAlias = RESULT_QUERY.res_plant
        ORDER BY 
            batch_year ASC,
            batch_month ASC,
            batch_number ASC,   
            CASE
                WHEN RESULT_QUERY.b_product_name != '' THEN RESULT_QUERY.b_product_name
				ELSE RESULT_QUERY.w_product_name
            END ASC            
           
        OFFSET (:offset) ROWS 
        FETCH NEXT (:limit) ROWS ONLY
    `;

    const countResp: CountResp[] = await this.traceBatchRepository.sequelize.query(count_query, {
      replacements: {
        batchName: dto.filter.batchName,
        batchDate: dto.filter.batchDate,
        productId: dto.filter.productId,
        compare: dto.filter.compare ? "true" : "false",
        plant: dto.filter.plants.length ? dto.filter.plants[0] : "",
      },
      type: sequelize.QueryTypes.SELECT,
    });

    const rowsResp = await this.traceBatchRepository.sequelize.query(
      dto.filter.sortByBatch ? row_query_by_batch : row_query,
      {
        replacements: {
          batchName: dto.filter.batchName,
          batchDate: dto.filter.batchDate,
          productId: dto.filter.productId,
          compare: dto.filter.compare ? "true" : "false",
          plant: dto.filter.plants.length ? dto.filter.plants[0] : "",
          offset: dto.limit * (dto.page - 1),
          limit: dto.limit,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return { total: countResp[0].count, rows: rowsResp };
  }
}
