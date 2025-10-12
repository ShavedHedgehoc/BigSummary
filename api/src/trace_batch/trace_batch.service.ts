import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import TraceBatch from "../trace_models/trace_batch.model";
import sequelize, { col, literal } from "sequelize";
import { GetTraceBatchsDto } from "./dto/get-trace-batchs.dto";
import TraceBtProduct from "src/trace_models/trace_bt_product.model";
import TraceProduct from "src/trace_models/trace_product.model";
import { GetTraceBatchsWghtReportDto } from "./dto/get-trace-batchs-wght-report.dto";
import { GetTraceBatchsWghtReportDetailDto } from "./dto/get-batchs-wght-report-detail.dto";
import { GetWeightingsSummaryDto } from "./dto/get-weightings-summary.dto";
import { GetWeightingsSummaryDetailDto } from "./dto/get-weightings-summary-detail.dto";

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

    const new_row_query = `
    SELECT 
        B.BatchPK AS batch_id, 
        B.BatchName AS batch_name, 
        B.BatchDate AS [date], 
        Pts.PlantName AS plant, 
        Pr.ProductId AS product_id, 
        Pr.ProductMarking AS marking 
    FROM Batchs AS B 
    LEFT JOIN BtProducts AS BP ON B.BatchPK = BP.BatchPK 
    LEFT JOIN Products AS Pr 
    ON 
        Pr.ProductId = BP.ProductId AND ((:marking) IS NULL OR Pr.ProductMarking LIKE '%' + (:marking) + '%')
    LEFT JOIN Plants AS Pts ON Pts.PlantAlias = B.Plant 
    WHERE ((:batch) IS NULL OR B.BatchName LIKE '%' + (:batch) + '%') 
    AND ((:start_date) IS NULL OR B.BatchDate >= (:start_date)) 
    AND ((:end_date) IS NULL OR B.BatchDate < DATEADD(day, 1, (:end_date)))
    AND ((:plant) IS NULL OR B.Plant = (:plant)) 
    ORDER BY 
    B.BatchYear ASC, 
    B.BatchMonth ASC, 
    B.BatchNumber ASC     
    OFFSET (:offset) ROWS
    FETCH NEXT (:limit) ROWS ONLY   
    `;

    const new_count_query = `
    SELECT 
        COUNT(DISTINCT B.BatchPK) AS count 
    FROM Batchs AS B 
    LEFT JOIN BtProducts AS BP ON B.BatchPK = BP.BatchPK 
    LEFT JOIN Products AS Pr ON Pr.ProductId = BP.ProductId 
    LEFT JOIN Plants AS Pts ON Pts.PlantAlias = B.Plant 
    WHERE 
        (:batch IS NULL OR B.BatchName LIKE '%' + :batch + '%') 
    AND (:start_date IS NULL OR B.BatchDate >= :start_date) 
    AND (:end_date IS NULL OR B.BatchDate <= :end_date) 
    AND (:plant IS NULL OR B.Plant = :plant) 
    AND (:marking IS NULL OR Pr.ProductMarking LIKE '%' + :marking + '%') 
    OPTION (RECOMPILE)    
    `;

    const countResp: CountResp[] = await this.traceBatchRepository.sequelize.query(new_count_query, {
      replacements: {
        batch: dto.filter.batch === "" ? null : dto.filter.batch,
        start_date: dto.filter.startDate,
        end_date: dto.filter.endDate,
        plant: dto.filter.plants.length ? dto.filter.plants[0] : null,
        marking: dto.filter.marking === "" ? null : dto.filter.marking,
        month: dto.filter.month === "" ? null : dto.filter.month,
        year: dto.filter.year === "" ? null : dto.filter.year,
      },
      type: sequelize.QueryTypes.SELECT,
    });

    const rowsResp = await this.traceBatchRepository.sequelize.query(new_row_query, {
      replacements: {
        batch: dto.filter.batch === "" ? null : dto.filter.batch,
        start_date: dto.filter.startDate,
        end_date: dto.filter.endDate,
        plant: dto.filter.plants.length ? dto.filter.plants[0] : null,
        marking: dto.filter.marking === "" ? null : dto.filter.marking,
        month: dto.filter.month === "" ? null : dto.filter.month,
        year: dto.filter.year === "" ? null : dto.filter.year,
        offset: dto.limit * (dto.page - 1),
        limit: dto.limit,
      },
      type: sequelize.QueryTypes.SELECT,
    });

    return { total: countResp[0].count, rows: rowsResp };
    // return { total: 50000, rows: rowsResp };
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

    //     Index recommendations (create if missing):
    // Nonclustered IX_Boils_BatchPK_ProductId ON Boils(BatchPK, ProductId) INCLUDE(Quantity)
    // Nonclustered IX_Weightings_BatchPK_ProductId ON Weightings(BatchPK, ProductId) INCLUDE(Quantity)
    // Nonclustered IX_Batchs_BatchDate_Plant_BatchName ON Batchs(BatchDate, Plant, BatchName) INCLUDE(BatchPK, BatchYear, BatchMonth, BatchNumber)
    // Consider full-text index on BatchName/ProductName if you need leading-wildcard searches
    // Notes:
    // If Products can be missing for Boils/Weightings, keep LEFT JOIN and handle NULLs accordingly (but inner joins are faster when FK integrity holds).
    // Removing leading wildcard (%) will allow index seeks; if you must search anywhere within the string, consider full-text indexing.

    const rq_head = `
        WITH
        AllSums AS
        (
            SELECT b.BatchPK AS batch_id,
                b.BatchName AS batch_name,
                b.Plant AS plant,
                b.BatchDate AS batch_date,
                b.BatchYear,
                b.BatchMonth,
                b.BatchNumber,
                bl.ProductId AS product_id,
                p.ProductName AS product_name,
                SUM(bl.Quantity) AS plan_q,
                0.0 AS fact_q
            FROM Boils bl
                INNER JOIN Batchs b ON b.BatchPK = bl.BatchPK
                INNER JOIN Products p ON p.ProductId = bl.ProductId
            WHERE ((:startDate) IS NULL OR b.BatchDate >= (:startDate))
                AND ((:endDate) IS NULL OR b.BatchDate <  DATEADD(day,1,(:endDate)))
                AND ((:batchName) IS NULL OR b.BatchName LIKE '%' + (:batchName) + '%')                
                AND ((:plant) IS NULL OR b.Plant = (:plant))
                AND ((:productId) IS NULL OR p.ProductId LIKE '%' + (:productId) + '%')
            GROUP BY 
            b.BatchPK, b.BatchName, b.Plant, b.BatchDate, b.BatchYear, b.BatchMonth, b.BatchNumber, bl.ProductId, p.ProductName
        UNION ALL
            SELECT b.BatchPK AS batch_id,
                b.BatchName AS batch_name,
                b.Plant AS plant,
                b.BatchDate AS batch_date,
                b.BatchYear,
                b.BatchMonth,
                b.BatchNumber,
                w.ProductId AS product_id,
                p.ProductName AS product_name,
                0.0 AS plan_q,
                SUM(w.Quantity) AS fact_q
            FROM Weightings w
                INNER JOIN Batchs b ON b.BatchPK = w.BatchPK
                INNER JOIN Products p ON p.ProductId = w.ProductId
            WHERE ((:startDate) IS NULL OR b.BatchDate >= (:startDate))
                AND ((:endDate) IS NULL OR b.BatchDate <  DATEADD(day,1,(:endDate)))
                AND ((:batchName) IS NULL OR b.BatchName LIKE '%' + (:batchName) + '%')
                AND ((:plant) IS NULL OR b.Plant = (:plant))
                AND ((:productId) IS NULL OR p.ProductId LIKE '%' + (:productId) + '%')
            GROUP BY 
            b.BatchPK, b.BatchName, b.Plant, b.BatchDate, b.BatchYear, b.BatchMonth, b.BatchNumber, w.ProductId, p.ProductName
        )
        SELECT
            s.batch_id,
            s.batch_name,
            --s.plant,
            p.PlantName AS plant,
            s.batch_date,
            s.product_id,
            s.product_name,
            SUM(s.plan_q) AS plan_q,
            SUM(s.fact_q) AS fact_q,
            s.BatchYear,
            s.BatchMonth,
            s.BatchNumber
        FROM AllSums s
        LEFT JOIN Plants p ON p.PlantAlias = s.plant
        GROUP BY s.batch_id, s.batch_name, 
        --s.plant, 
        s.batch_date, s.product_id, s.product_name, s.BatchYear, s.BatchMonth, s.BatchNumber,p.PlantName
        HAVING ((:compare) = 'false')
            OR ( SUM(s.plan_q) <> SUM(s.fact_q) OR SUM(s.plan_q) IS NULL OR SUM(s.fact_q) IS NULL )
        
    `;

    const rq_end = `        
        OFFSET (:offset) ROWS
        FETCH NEXT (:limit) ROWS ONLY;            
    `;

    const rq_sort_by_batch = `       
        ORDER BY s.BatchYear ASC, s.BatchMonth ASC, s.BatchNumber ASC, s.product_name ASC                   
    `;

    const rq_sort_by_product = `       
        ORDER BY s.product_name ASC, s.BatchYear ASC, s.BatchMonth ASC, s.BatchNumber ASC                  
    `;

    const r_qry = `
        WITH
        AllSums AS
        (
            SELECT b.BatchPK AS batch_id,
                b.BatchName AS batch_name,
                b.Plant AS plant,
                b.BatchDate AS batch_date,
                b.BatchYear,
                b.BatchMonth,
                b.BatchNumber,
                bl.ProductId AS product_id,
                p.ProductName AS product_name,
                SUM(bl.Quantity) AS plan_q,
                0.0 AS fact_q
            FROM Boils bl
                INNER JOIN Batchs b ON b.BatchPK = bl.BatchPK
                INNER JOIN Products p ON p.ProductId = bl.ProductId
            WHERE ((:startDate) IS NULL OR b.BatchDate >= (:startDate))
                AND ((:endDate) IS NULL OR b.BatchDate <  DATEADD(day,1,(:endDate)))
                AND ((:batchName) IS NULL OR b.BatchName LIKE '%' + (:batchName) + '%')                
                AND ((:plant) IS NULL OR b.Plant = (:plant))
                AND ((:productId) IS NULL OR p.ProductId LIKE '%' + (:productId) + '%')
            GROUP BY 
            b.BatchPK, b.BatchName, b.Plant, b.BatchDate, b.BatchYear, b.BatchMonth, b.BatchNumber, bl.ProductId, p.ProductName
        UNION ALL
            SELECT b.BatchPK AS batch_id,
                b.BatchName AS batch_name,
                b.Plant AS plant,
                b.BatchDate AS batch_date,
                b.BatchYear,
                b.BatchMonth,
                b.BatchNumber,
                w.ProductId AS product_id,
                p.ProductName AS product_name,
                0.0 AS plan_q,
                SUM(w.Quantity) AS fact_q
            FROM Weightings w
                INNER JOIN Batchs b ON b.BatchPK = w.BatchPK
                INNER JOIN Products p ON p.ProductId = w.ProductId
            WHERE ((:startDate) IS NULL OR b.BatchDate >= (:startDate))
                AND ((:endDate) IS NULL OR b.BatchDate <  DATEADD(day,1,(:endDate)))
                AND ((:batchName) IS NULL OR b.BatchName LIKE '%' + (:batchName) + '%')
                AND ((:plant) IS NULL OR b.Plant = (:plant))
                AND ((:productId) IS NULL OR p.ProductId LIKE '%' + (:productId) + '%')
            GROUP BY 
            b.BatchPK, b.BatchName, b.Plant, b.BatchDate, b.BatchYear, b.BatchMonth, b.BatchNumber, w.ProductId, p.ProductName
        )
        SELECT
            s.batch_id,
            s.batch_name,
            --s.plant,
            p.PlantName AS plant,
            s.batch_date,
            s.product_id,
            s.product_name,
            SUM(s.plan_q) AS plan_q,
            SUM(s.fact_q) AS fact_q,
            s.BatchYear,
            s.BatchMonth,
            s.BatchNumber
        FROM AllSums s
        LEFT JOIN Plants p ON p.PlantAlias = s.plant
        GROUP BY s.batch_id, s.batch_name, 
        --s.plant, 
        s.batch_date, s.product_id, s.product_name, s.BatchYear, s.BatchMonth, s.BatchNumber,p.PlantName
        HAVING ((:compare) = 'false')
            OR ( SUM(s.plan_q) <> SUM(s.fact_q) OR SUM(s.plan_q) IS NULL OR SUM(s.fact_q) IS NULL )
        ORDER BY s.BatchYear ASC, s.BatchMonth ASC, s.BatchNumber ASC, s.product_name ASC 
        OFFSET (:offset) ROWS
        FETCH NEXT (:limit) ROWS ONLY;            
    `;

    const c_qry2 = `    
    WITH BoilSums AS ( 
    SELECT b.BatchPK AS batch_id, 
    b.BatchName AS batch_name, 
    b.Plant AS plant, 
        b.BatchDate AS batch_date,
        b.BatchYear,
        b.BatchMonth,
        b.BatchNumber,
        bl.ProductId AS product_id,
        SUM(bl.Quantity) AS plan_q
        FROM Boils bl
            INNER JOIN Batchs b ON b.BatchPK = bl.BatchPK
        WHERE (
                (:startDate) IS NULL
                OR b.BatchDate >= (:startDate)
            )
            AND (
                (:endDate) IS NULL
                OR b.BatchDate < DATEADD(day, 1,(:endDate))
            )
            AND (
                (:batchName) IS NULL
                OR b.BatchName LIKE '%' + (:batchName) + '%'
            )
            AND (
                (:plant) IS NULL
                OR b.Plant = (:plant)
            )
            AND (
                (:productId) IS NULL
                OR bl.ProductId LIKE '%' + (:productId) + '%'
            )
        GROUP BY b.BatchPK,
            b.BatchName,
            b.Plant,
            b.BatchDate,
            b.BatchYear,
            b.BatchMonth,
            b.BatchNumber,
            bl.ProductId
        ),
        WeightSums AS (
            SELECT b.BatchPK AS batch_id,
                b.BatchName AS batch_name,
                b.Plant AS plant,
                b.BatchDate AS batch_date,
                b.BatchYear,
                b.BatchMonth,
                b.BatchNumber,
                w.ProductId AS product_id,
                SUM(w.Quantity) AS fact_q
            FROM Weightings w
                INNER JOIN Batchs b ON b.BatchPK = w.BatchPK
            WHERE (
                    (:startDate) IS NULL
                    OR b.BatchDate >= (:startDate)
                )
                AND (
                    (:endDate) IS NULL
                    OR b.BatchDate < DATEADD(day, 1,(:endDate))
                )
                AND (
                    (:batchName) IS NULL
                    OR b.BatchName LIKE '%' + (:batchName) + '%'
                )
                AND (
                    (:plant) IS NULL
                    OR b.Plant = (:plant)
                )
                AND (
                    (:productId) IS NULL
                    OR w.ProductId LIKE '%' + (:productId) + '%'
                )
            GROUP BY b.BatchPK,
                b.BatchName,
                b.Plant,
                b.BatchDate,
                b.BatchYear,
                b.BatchMonth,
                b.BatchNumber,
                w.ProductId
        )
        SELECT COUNT(*) as count
        FROM (
                SELECT COALESCE(b.batch_id, w.batch_id) AS batch_id,
                    COALESCE(b.batch_name, w.batch_name) AS batch_name,
                    COALESCE(b.batch_date, w.batch_date) AS batch_date,
                    COALESCE(b.product_id, w.product_id) AS product_id,
                    COALESCE(b.plan_q, 0.0) AS plan_q,
                    COALESCE(w.fact_q, 0.0) AS fact_q,
                    COALESCE(b.BatchYear, w.BatchYear) AS BatchYear,
                    COALESCE(b.BatchMonth, w.BatchMonth) AS BatchMonth,
                    COALESCE(b.BatchNumber, w.BatchNumber) AS BatchNumber
                FROM BoilSums b
                    FULL OUTER JOIN WeightSums w ON b.batch_id = w.batch_id
                    AND b.product_id = w.product_id
            ) merged
        WHERE ((:compare) = 'false')
            OR (
                merged.plan_q <> merged.fact_q
                OR merged.plan_q IS NULL
                OR merged.fact_q IS NULL
            );
    `;

    const countResp: CountResp[] = await this.traceBatchRepository.sequelize.query(c_qry2, {
      replacements: {
        batchName: dto.filter.batchName,
        startDate: dto.filter.startDate,
        endDate: dto.filter.endDate,
        productId: dto.filter.productId,
        compare: dto.filter.compare ? "true" : "false",
        plant: dto.filter.plants.length ? dto.filter.plants[0] : null,
      },
      type: sequelize.QueryTypes.SELECT,
    });

    const rowsResp = await this.traceBatchRepository.sequelize.query(
      dto.filter.sortByBatch ? rq_head + rq_sort_by_batch + rq_end : rq_head + rq_sort_by_product + rq_end,
      {
        replacements: {
          batchName: dto.filter.batchName,
          startDate: dto.filter.startDate,
          endDate: dto.filter.endDate,
          productId: dto.filter.productId,
          compare: dto.filter.compare ? "true" : "false",
          plant: dto.filter.plants.length ? dto.filter.plants[0] : null,
          offset: dto.limit * (dto.page - 1),
          limit: dto.limit,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return { total: countResp[0].count, rows: rowsResp };
  }

  async getBatchsWghtReportDetail(dto: GetTraceBatchsWghtReportDetailDto) {
    const detail_query = `
            SELECT
            Weightings.WeightingsPK as weighting_pk,
            Weightings.ContainerPK as container_pk,
            Weightings.ProductId as product_id,
            Products.ProductName as product_name,
            Lots.LotName as lot_name,
            Weightings.Quantity as quantity,
            Authors.AuthorName as author,
            Documents.CreateDate as w_date,
            Cnt_query.records_cnt as records,
            Load_qry.load_date as l_date
        FROM
            Weightings
            JOIN
            Batchs
            ON
        Batchs.BatchPK= Weightings.BatchPK
            JOIN Products
            ON
        Products.ProductId = Weightings.ProductId
            JOIN
            Lots
            ON
        Lots.LotPK=Weightings.LotPK
            JOIN
            Documents
            ON
        Documents.DocumentPK=Weightings.DocumentPK
            JOIN Authors
            ON
        Authors.AuthorPK = Documents.AuthorPK
            JOIN
            (SELECT
                ContainerPK as ContPK,
                COUNT (ContainerPk) as records_cnt
            FROM Weightings
            GROUP BY ContainerPK
        ) as Cnt_query
            ON Weightings.ContainerPK=Cnt_query.ContPK
            LEFT JOIN
            (SELECT
                Loads.ContainerPK,
                Documents.CreateDate as load_date
            FROM Loads
                JOIN
                Documents ON Loads.DocumentPK = Documents.DocumentPK
        ) as Load_qry
            ON Load_qry.ContainerPK = Weightings.ContainerPK
        WHERE BatchName = (:batchName) AND Weightings.ProductId = (:productId)
        ORDER BY Documents.CreateDate ASC`;
    const detailResp = await this.traceBatchRepository.sequelize.query(detail_query, {
      replacements: {
        batchName: dto.batchName,
        productId: dto.productId,
      },

      type: sequelize.QueryTypes.SELECT,
    });
    return detailResp;
  }
  async deleteWeightingsByContainerId(conatinerId: number) {
    interface CountResp {
      count: number;
    }
    const load_qry = `
        SELECT
        COUNT(*) as count
        FROM
        Loads
        WHERE
        ContainerPK = (:ContainerPK)
        `;
    const deleteQuery = `
        DELETE
        FROM
        Weightings
        WHERE
        ContainerPK = (:ContainerPK)
    `;

    const countResp: CountResp[] = await this.traceBatchRepository.sequelize.query(load_qry, {
      replacements: {
        ContainerPK: conatinerId,
      },
      type: sequelize.QueryTypes.SELECT,
    });

    if (countResp[0].count > 0) {
      throw new HttpException(`Емкость загружена, удаление невозможно...`, HttpStatus.BAD_REQUEST);
    }
    await this.traceBatchRepository.sequelize.query(deleteQuery, {
      replacements: {
        ContainerPK: conatinerId,
      },
      type: sequelize.QueryTypes.DELETE,
    });
  }

  async getWeightingDepartmentSummary(dto: GetWeightingsSummaryDto) {
    // optimized
    const new_query = `
    WITH Docs AS (
    SELECT 
    d.DocumentPK, 
    d.AuthorPK 
    FROM Documents d 
    JOIN Doctypes dt ON dt.DoctypePK = d.DoctypePK 
    AND dt.DoctypeAlias = N'Взвешивание' 
    LEFT JOIN AuthorOccupations ao ON ao.AuthorPK = d.AuthorPK 
    LEFT JOIN Plants p ON p.PlantPK = ao.PlantPK 
    WHERE 
    ((:startDate) IS NULL OR d.CreateDate >= (:startDate)) 
    AND ((:endDate) IS NULL OR d.CreateDate < DATEADD(day,1,(:endDate))) 
    AND ((:author) IS NULL OR EXISTS ( 
    SELECT 1 FROM Authors a 
    WHERE a.AuthorPK = d.AuthorPK 
    AND a.AuthorName LIKE CONCAT('%', (:author), '%') )) 
    AND ((:plant) IS NULL OR p.PlantAlias = (:plant)) ), 
    WeightAgg AS (
    SELECT 
    d.AuthorPK, 
    COUNT(*) AS w_rows, 
    SUM(w.Quantity) AS w_total, 
    MIN(w.WeightingsPK) AS min_wpk, 
    MAX(w.WeightingsPK) AS max_wpk 
    FROM Docs d 
    JOIN Weightings w ON w.DocumentPK = d.DocumentPK 
    GROUP BY d.AuthorPK ) 
    SELECT 
    a.AuthorPK AS w_author_id, 
    a.AuthorName AS w_name, 
    wa.w_rows, 
    wa.w_total, 
    dmin.CreateDate AS w_start_date, 
    dmax.CreateDate AS w_end_date 
    FROM WeightAgg wa 
    JOIN Authors a ON a.AuthorPK = wa.AuthorPK 
    JOIN Weightings wmin ON wmin.WeightingsPK = wa.min_wpk 
    JOIN Documents dmin ON dmin.DocumentPK = wmin.DocumentPK 
    JOIN Weightings wmax ON wmax.WeightingsPK = wa.max_wpk 
    JOIN Documents dmax ON dmax.DocumentPK = wmax.DocumentPK 
    ORDER BY  a.AuthorName ;
    `;

    const rowsResp = await this.traceBatchRepository.sequelize.query(new_query, {
      replacements: {
        startDate: dto.filter.startDate,
        endDate: dto.filter.endDate,
        author: dto.filter.author === "" ? null : dto.filter.author,
        plant: dto.filter.plants.length ? dto.filter.plants[0] : null,
      },
      type: sequelize.QueryTypes.SELECT,
    });

    return rowsResp;
  }
  async getWeightingsDepartmentsSummaryDetail(dto: GetWeightingsSummaryDetailDto) {
    interface CountResp {
      count: number;
    }
    console.log(dto);
    const count_qry_new = `
    SELECT COUNT(*) AS count 
    FROM Weightings w 
    WHERE EXISTS ( 
        SELECT 1 FROM Documents d 
        WHERE d.DocumentPK = w.DocumentPK 
        AND d.AuthorPK = (:author_id) 
        AND d.CreateDate >= (:startDate) 
        AND d.CreateDate < DATEADD(day, 1, (:endDate)) 
        ) OPTION (RECOMPILE)
    `;

    const row_qry_new = `
    SELECT 
    w.WeightingsPK AS w_id, 
    d.CreateDate AS w_date, 
    b.BatchName AS w_batch_name, 
    w.ProductId AS w_product_id, 
    p.ProductName AS w_product_name, 
    l.LotName AS w_lot_name, 
    w.Quantity AS w_quantity 
    FROM Weightings w 
    INNER JOIN Documents d ON w.DocumentPK = d.DocumentPK 
    AND d.CreateDate >= (:startDate) 
    AND d.CreateDate < DATEADD(day, 1, (:endDate)) 
    AND d.AuthorPK = (:author_id) 
    INNER JOIN Products p ON p.ProductId = w.ProductId 
    INNER JOIN Batchs b ON b.BatchPK = w.BatchPK 
    INNER JOIN Lots l ON l.LotPK = w.LotPK 
    ORDER BY 
    d.CreateDate ASC, 
    w.WeightingsPK ASC 
    OFFSET (:offset) ROWS 
    FETCH NEXT (:limit) ROWS ONLY
    `;

    const countResp: CountResp[] = await this.traceBatchRepository.sequelize.query(count_qry_new, {
      replacements: {
        startDate: dto.startDate,
        endDate: dto.endDate,
        author_id: dto.author_id,
      },
      type: sequelize.QueryTypes.SELECT,
    });

    const rowsResp = await this.traceBatchRepository.sequelize.query(row_qry_new, {
      replacements: {
        startDate: dto.startDate,
        endDate: dto.endDate,
        author_id: dto.author_id,
        offset: dto.limit * (dto.page - 1),
        limit: dto.limit,
      },
      type: sequelize.QueryTypes.SELECT,
    });

    return { total: countResp[0].count, rows: rowsResp };
  }
}
