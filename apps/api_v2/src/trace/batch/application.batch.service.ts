import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { mssqlPrisma, Prisma } from '@repo/db-mssql';

interface GetTraceBatchsWghtReportDto {
  page: number;
  limit: number;
  filter: {
    batchName?: string | null;
    startDate?: string | Date | null;
    endDate?: string | Date | null;
    productId?: string | null;
    compare?: boolean;
    plants: string[];
    sortByBatch?: boolean;
  };
}

interface CountResp {
  count: number;
}

interface RowsResp {
  count: number;
}

@Injectable()
// implements IApplicationTraceBatchService
export class ApplicationTraceBacthService {
  async getWeightingReport(dto: GetTraceBatchsWghtReportDto) {
    const batchNameParam = dto.filter.batchName || null;
    const startDateParam = dto.filter.startDate ? new Date(dto.filter.startDate) : null;
    const endDateParam = dto.filter.endDate ? new Date(dto.filter.endDate) : null;
    const productIdParam = dto.filter.productId || null;
    const compareParam = dto.filter.compare ? 'true' : 'false';
    const plantParam = dto.filter.plants.length ? dto.filter.plants[0] : null;
    const limitParam = dto.limit;
    const offsetParam = dto.limit * (dto.page - 1);

    const orderByClause = dto.filter.sortByBatch
      ? `ORDER BY s.BatchYear ASC, s.BatchMonth ASC, s.BatchNumber ASC, s.product_name ASC`
      : `ORDER BY s.product_name ASC, s.BatchYear ASC, s.BatchMonth ASC, s.BatchNumber ASC`;

    const rowsResp = await mssqlPrisma.$queryRaw<RowsResp[]>`
     WITH AllSums AS (
      SELECT 
        b.BatchPK AS batch_id, 
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
      WHERE (${startDateParam} IS NULL OR b.BatchDate >= ${startDateParam})
        AND (${endDateParam} IS NULL OR b.BatchDate < DATEADD(day, 1, ${endDateParam}))
        AND (${batchNameParam} IS NULL OR b.BatchName LIKE '%' + ${batchNameParam} + '%')
        AND (${plantParam} IS NULL OR b.Plant = ${plantParam})
        AND (${productIdParam} IS NULL OR p.ProductId LIKE '%' + ${productIdParam} + '%')
      GROUP BY b.BatchPK, b.BatchName, b.Plant, b.BatchDate, b.BatchYear, b.BatchMonth, b.BatchNumber, bl.ProductId, p.ProductName

      UNION ALL

      SELECT 
        b.BatchPK AS batch_id, 
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
      WHERE (${startDateParam} IS NULL OR b.BatchDate >= ${startDateParam})
        AND (${endDateParam} IS NULL OR b.BatchDate < DATEADD(day, 1, ${endDateParam}))
        AND (${batchNameParam} IS NULL OR b.BatchName LIKE '%' + ${batchNameParam} + '%')
        AND (${plantParam} IS NULL OR b.Plant = ${plantParam})
        AND (${productIdParam} IS NULL OR p.ProductId LIKE '%' + ${productIdParam} + '%')
      GROUP BY b.BatchPK, b.BatchName, b.Plant, b.BatchDate, b.BatchYear, b.BatchMonth, b.BatchNumber, w.ProductId, p.ProductName
    )
    SELECT 
      s.batch_id, 
      s.batch_name, 
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
    GROUP BY s.batch_id, s.batch_name, s.batch_date, s.product_id, s.product_name, s.BatchYear, s.BatchMonth, s.BatchNumber, p.PlantName
    HAVING (${compareParam} = 'false') OR (
      SUM(s.plan_q) <> SUM(s.fact_q) 
      OR SUM(s.plan_q) IS NULL 
      OR SUM(s.fact_q) IS NULL
    )
    ${Prisma.raw(orderByClause)}
    OFFSET ${offsetParam} ROWS FETCH NEXT ${limitParam} ROWS ONLY;
    `;

    const countResp = await mssqlPrisma.$queryRaw<CountResp[]>`
    WITH BoilSums AS (
      SELECT 
        b.BatchPK AS batch_id, 
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
      WHERE (${startDateParam} IS NULL OR b.BatchDate >= ${startDateParam})
        AND (${endDateParam} IS NULL OR b.BatchDate < DATEADD(day, 1, ${endDateParam}))
        AND (${batchNameParam} IS NULL OR b.BatchName LIKE '%' + ${batchNameParam} + '%')
        AND (${plantParam} IS NULL OR b.Plant = ${plantParam})
        AND (${productIdParam} IS NULL OR bl.ProductId LIKE '%' + ${productIdParam} + '%')
      GROUP BY b.BatchPK, b.BatchName, b.Plant, b.BatchDate, b.BatchYear, b.BatchMonth, b.BatchNumber, bl.ProductId
    ), 
    WeightSums AS (
      SELECT 
        b.BatchPK AS batch_id, 
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
      WHERE (${startDateParam} IS NULL OR b.BatchDate >= ${startDateParam})
        AND (${endDateParam} IS NULL OR b.BatchDate < DATEADD(day, 1, ${endDateParam}))
        AND (${batchNameParam} IS NULL OR b.BatchName LIKE '%' + ${batchNameParam} + '%')
        AND (${plantParam} IS NULL OR b.Plant = ${plantParam})
        AND (${productIdParam} IS NULL OR w.ProductId LIKE '%' + ${productIdParam} + '%')
      GROUP BY b.BatchPK, b.BatchName, b.Plant, b.BatchDate, b.BatchYear, b.BatchMonth, b.BatchNumber, w.ProductId
    )
    SELECT COUNT(*) as count 
    FROM (
      SELECT 
        COALESCE(b.batch_id, w.batch_id) AS batch_id,
        COALESCE(b.batch_name, w.batch_name) AS batch_name,
        COALESCE(b.batch_date, w.batch_date) AS batch_date,
        COALESCE(b.product_id, w.product_id) AS product_id,
        COALESCE(b.plan_q, 0.0) AS plan_q,
        COALESCE(w.fact_q, 0.0) AS fact_q,
        COALESCE(b.BatchYear, w.BatchYear) AS BatchYear,
        COALESCE(b.BatchMonth, w.BatchMonth) AS BatchMonth,
        COALESCE(b.BatchNumber, w.BatchNumber) AS BatchNumber
      FROM BoilSums b
      FULL OUTER JOIN WeightSums w ON b.batch_id = w.batch_id AND b.product_id = w.product_id
    ) merged
    WHERE (${compareParam} = 'false') OR (
      merged.plan_q <> merged.fact_q 
      OR merged.plan_q IS NULL 
      OR merged.fact_q IS NULL
    );
  `;

    return {
      total: Number(countResp[0]?.count ?? 0),
      rows: rowsResp,
    };
  }
}
