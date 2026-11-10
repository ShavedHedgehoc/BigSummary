import { Injectable } from '@nestjs/common';
import { mssqlPrisma, Prisma } from '@repo/db-mssql';
import {
  TApplicationTraceBoilWghtReportResponse,
  TApplicationTraceBoilWghtReportRowItem,
  TGetApplicationGetTraceBoilWghtReportInput,
} from '@repo/schemas';
import { IApplicationTraceBoilService } from '@repo/trpc';

const boilsWithRelationsInclude = {
  Batchs: true,
  Products: true,
} satisfies Prisma.BoilsInclude;

const weightingsWithRelationsInclude = {
  Batchs: true,
  Products: true,
} satisfies Prisma.WeightingsInclude;

interface CountResp {
  count: number;
}

@Injectable()
export class ApplicationTraceBoilService implements IApplicationTraceBoilService {
  async getWeightingReport(
    input: TGetApplicationGetTraceBoilWghtReportInput,
  ): Promise<TApplicationTraceBoilWghtReportResponse> {
    const {
      batchName,
      sortByBatch,
      productId,
      startDate,
      endDate,
      plants,
      compare,
      limit,
      page,
      getAllRows,
    } = input;

    const commonWhere = {
      Batchs: {
        ...(startDate || endDate
          ? {
              BatchDate: {
                ...(startDate ? { gte: new Date(startDate) } : {}),
                ...(endDate
                  ? { lt: new Date(new Date(endDate).setDate(new Date(endDate).getDate() + 1)) }
                  : {}),
              },
            }
          : {}),
        ...(batchName ? { BatchName: { contains: batchName } } : {}),
        ...(plants?.length ? { Plant: plants[0] } : {}),
      },
      ...(productId ? { ProductId: { contains: productId } } : {}),
    } as Prisma.BoilsWhereInput & Prisma.WeightingsWhereInput;

    const [boils, weightings] = await Promise.all([
      mssqlPrisma.boils.findMany({
        where: commonWhere as Prisma.BoilsWhereInput,
        include: boilsWithRelationsInclude,
      }),
      mssqlPrisma.weightings.findMany({
        where: commonWhere as Prisma.WeightingsWhereInput,
        include: weightingsWithRelationsInclude,
      }),
    ]);

    const mergedMap = new Map<string, TApplicationTraceBoilWghtReportRowItem>();

    for (const b of boils) {
      const key = `${b.BatchPK}_${b.ProductId}`;
      mergedMap.set(key, {
        batchId: b.BatchPK,
        batchName: b.Batchs.BatchName,
        plantName: b.Batchs.Plant,
        batchDate: b.Batchs.BatchDate,
        productId: b.ProductId,
        productName: b.Products?.ProductName ?? '',
        batchYear: b.Batchs.BatchYear,
        batchMonth: b.Batchs.BatchMonth,
        batchNumber: b.Batchs.BatchNumber,
        planQuantity: (mergedMap.get(key)?.planQuantity ?? 0) + Number(b.Quantity),
        factQuantity: 0,
      });
    }

    for (const w of weightings) {
      const key = `${w.BatchPK}_${w.ProductId}`;
      if (mergedMap.has(key)) {
        const existing = mergedMap.get(key);
        existing.factQuantity += Number(w.Quantity);
      } else {
        mergedMap.set(key, {
          batchId: w.BatchPK,
          batchName: w.Batchs.BatchName,
          plantName: w.Batchs.Plant,
          batchDate: w.Batchs.BatchDate,
          productId: w.ProductId,
          productName: w.Products?.ProductName ?? '',
          batchYear: w.Batchs.BatchYear,
          batchMonth: w.Batchs.BatchMonth,
          batchNumber: w.Batchs.BatchNumber,
          planQuantity: 0,
          factQuantity: Number(w.Quantity),
        });
      }
    }

    // 4. Фильтрация по расхождениям (compareParam === 'true')
    let allRowsList = Array.from(mergedMap.values());
    if (compare) {
      allRowsList = allRowsList.filter(
        (row) =>
          row.planQuantity !== row.factQuantity ||
          row.planQuantity === null ||
          row.factQuantity === null,
      );
    }

    // 5. Сортировка (sortByBatch) на уровне JS
    allRowsList.sort((a, b) => {
      if (sortByBatch) {
        return (
          a.batchYear - b.batchYear ||
          a.batchMonth.localeCompare(b.batchMonth) ||
          a.batchNumber - b.batchNumber ||
          a.productName.localeCompare(b.productName)
        );
      }
      return (
        a.productName.localeCompare(b.productName) ||
        a.batchYear - b.batchYear ||
        a.batchMonth.localeCompare(b.batchMonth) ||
        a.batchNumber - b.batchNumber
      );
    });

    // 6. Пагинация (getAllRows)
    const total = allRowsList.length;
    const totalPages = Math.ceil(total / limit);

    const paginatedRows = getAllRows
      ? allRowsList
      : allRowsList.slice(limit * (page - 1), limit * page);

    return {
      total,
      totalPages,
      rows: paginatedRows,
    };
  }

  async getWeightingReport2(
    input: TGetApplicationGetTraceBoilWghtReportInput,
  ): Promise<TApplicationTraceBoilWghtReportResponse> {
    const {
      batchName,
      sortByBatch,
      productId,
      startDate,
      endDate,
      plants,
      compare,
      limit,
      page,
      getAllRows,
    } = input;

    const batchNameParam = batchName ? `%${batchName}%` : null;
    const productIdParam = productId ? `%${productId}%` : null;
    const plantParam = plants?.length ? plants[0] : null;
    const compareParam = compare ? 'true' : 'false';

    const startDateParams = startDate ? new Date(startDate) : null;
    const endDateParams = endDate ? new Date(endDate) : null;

    const offset = limit * (page - 1);

    // 2. Определение сортировки (Prisma.raw безопасен, так как sortByBatch контролируется кодом приложения)
    const orderClause = sortByBatch
      ? Prisma.raw(
          'ORDER BY s.BatchYear ASC, s.BatchMonth ASC, s.BatchNumber ASC, s.productName ASC',
        )
      : Prisma.raw(
          'ORDER BY s.productName ASC, s.BatchYear ASC, s.BatchMonth ASC, s.BatchNumber ASC',
        );

    // // 3. Выполнение COUNT запроса через $queryRaw
    // // Используем Prisma.sql для безопасной параметризации переменных
    // const countResp = await mssqlPrisma.$queryRaw<CountResp[]> /* SQL */ `
    //   WITH BoilSums AS (
    //     SELECT
    //     b.BatchPK AS batchId,
    //     b.BatchName AS batchName,
    //     b.Plant AS plantName,
    //     b.BatchDate AS batchDate,
    //     b.BatchYear,
    //     b.BatchMonth,
    //     b.BatchNumber,
    //     bl.ProductId AS productId,
    //     SUM(bl.Quantity) AS planQuantity
    //     FROM Boils bl
    //     INNER JOIN Batchs b ON b.BatchPK = bl.BatchPK
    //     WHERE (${startDateParams} IS NULL OR b.BatchDate >= ${startDateParams})
    //       AND (${endDateParams} IS NULL OR b.BatchDate < DATEADD(day, 1, ${endDateParams}))
    //       AND (${batchNameParam} IS NULL OR b.BatchName LIKE ${batchNameParam})
    //       AND (${plantParam} IS NULL OR b.Plant = ${plantParam})
    //       AND (${productIdParam} IS NULL OR bl.ProductId LIKE ${productIdParam})
    //     GROUP BY b.BatchPK, b.BatchName, b.Plant, b.BatchDate, b.BatchYear, b.BatchMonth, b.BatchNumber, bl.ProductId
    //   ),
    //   WeightSums AS (
    //     SELECT
    //     b.BatchPK AS batchId,
    //     b.BatchName AS batchName,
    //     b.Plant AS plantName,
    //     b.BatchDate AS batchDate,
    //     b.BatchYear,
    //     b.BatchMonth,
    //     b.BatchNumber,
    //     w.ProductId AS productId, SUM(w.Quantity) AS factQuantity
    //     FROM Weightings w
    //     INNER JOIN Batchs b ON b.BatchPK = w.BatchPK
    //     WHERE (${startDateParams} IS NULL OR b.BatchDate >= ${startDateParams})
    //       AND (${endDateParams} IS NULL OR b.BatchDate < DATEADD(day, 1, ${endDateParams}))
    //       AND (${batchNameParam} IS NULL OR b.BatchName LIKE ${batchNameParam})
    //       AND (${plantParam} IS NULL OR b.Plant = ${plantParam})
    //       AND (${productIdParam} IS NULL OR w.ProductId LIKE ${productIdParam})
    //     GROUP BY b.BatchPK, b.BatchName, b.Plant, b.BatchDate, b.BatchYear, b.BatchMonth, b.BatchNumber, w.ProductId
    //   )
    //   SELECT COUNT(*) as count
    //   FROM (
    //     SELECT
    //       COALESCE(b.batchId, w.batchId) AS batchId,
    //       COALESCE(b.planQuantity, 0.0) AS planQuantity,
    //       COALESCE(w.factQuantity, 0.0) AS factQuantity
    //     FROM BoilSums b
    //     FULL OUTER JOIN WeightSums w ON b.batchId = w.batchId AND b.productId = w.productId
    //   ) merged
    //   WHERE (${compareParam} = 'false') OR (
    //     merged.planQuantity <> merged.factQuantity OR merged.planQuantity IS NULL OR merged.factQuantity IS NULL
    //   );
    // `;

    // 4. Выполнение основного запроса ROWS через $queryRaw
    //   const rowsResp = await mssqlPrisma.$queryRaw<TApplicationTraceBoilWghtReportRowItem[]>`
    //   WITH AllSums AS (
    //     SELECT
    //       b.BatchPK AS batchId,
    //       b.BatchName AS batchName,
    //       b.Plant AS plantName,
    //       b.BatchDate AS batchDate,
    //       b.BatchYear,
    //       b.BatchMonth,
    //       b.BatchNumber,
    //       bl.ProductId AS productId,
    //       p.ProductName AS productName,
    //       SUM(bl.Quantity) AS planQuantity,
    //       0.0 AS factQuantity
    //     FROM Boils bl
    //     INNER JOIN Batchs b ON b.BatchPK = bl.BatchPK
    //     INNER JOIN Products p ON p.ProductId = bl.ProductId
    //     WHERE (${startDateParams} IS NULL OR b.BatchDate >= ${startDateParams})
    //       AND (${endDateParams} IS NULL OR b.BatchDate < DATEADD(day, 1, ${endDateParams}))
    //       AND (${batchNameParam} IS NULL OR b.BatchName LIKE ${batchNameParam})
    //       AND (${plantParam} IS NULL OR b.Plant = ${plantParam})
    //       AND (${productIdParam} IS NULL OR p.ProductId LIKE ${productIdParam})
    //     GROUP BY
    //       b.BatchPK,
    //       b.BatchName,
    //       b.Plant,
    //       b.BatchDate,
    //       b.BatchYear,
    //       b.BatchMonth,
    //       b.BatchNumber,
    //       bl.ProductId,
    //       p.ProductName

    //     UNION ALL

    //     SELECT
    //       b.BatchPK AS batchId,
    //       b.BatchName AS batchName,
    //       b.Plant AS plantName,
    //       b.BatchDate AS batchDate,
    //       b.BatchYear,
    //       b.BatchMonth,
    //       b.BatchNumber,
    //       w.ProductId AS productId,
    //       p.ProductName AS productName,
    //       0.0 AS planQuantity,
    //       SUM(w.Quantity) AS factQuantity
    //     FROM Weightings w
    //     INNER JOIN Batchs b ON b.BatchPK = w.BatchPK
    //     INNER JOIN Products p ON p.ProductId = w.ProductId
    //     WHERE (${startDate} IS NULL OR b.BatchDate >= ${startDate})
    //       AND (${endDate} IS NULL OR b.BatchDate < DATEADD(day, 1, ${endDate}))
    //       AND (${batchNameParam} IS NULL OR b.BatchName LIKE ${batchNameParam})
    //       AND (${plantParam} IS NULL OR b.Plant = ${plantParam})
    //       AND (${productIdParam} IS NULL OR p.ProductId LIKE ${productIdParam})
    //     GROUP BY
    //       b.BatchPK,
    //       b.BatchName,
    //       b.Plant,
    //       b.BatchDate,
    //       b.BatchYear,
    //       b.BatchMonth,
    //       b.BatchNumber,
    //       w.ProductId,
    //       p.ProductName
    //   )
    //   SELECT
    //     s.batchId,
    //     s.batchName,
    //     p.PlantName as plantName,
    //     s.batchDate,
    //     s.productId,
    //     s.productName,
    //     SUM(s.planQuantity) AS planQuantity,
    //     SUM(s.factQuantity) AS factQuantity,
    //     s.BatchYear as batchYear,
    //     s.BatchMonth as batchMonth,
    //     s.BatchNumber as batchNumber
    //   FROM AllSums s
    //   LEFT JOIN Plants p ON p.PlantAlias = s.plantName
    //   GROUP BY
    //     s.batchId,
    //     s.batchName,
    //     s.batchDate,
    //     s.productId,
    //     s.productName,
    //     s.BatchYear,
    //     s.BatchMonth,
    //     s.BatchNumber,
    //     p.PlantName
    //   HAVING (${compareParam} = 'false') OR (
    //     SUM(s.planQuantity) <> SUM(s.factQuantity) OR SUM(s.planQuantity) IS NULL OR SUM(s.factQuantity) IS NULL
    //   )
    //   ${orderClause}
    //   OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;
    // `;

    const countResp = await mssqlPrisma.$queryRaw<CountResp[]> /* SQL */ `
  WITH BoilAgg AS (
    SELECT 
      bl.BatchPK, 
      bl.ProductId, 
      SUM(bl.Quantity) AS planQuantity
    FROM Boils bl
    GROUP BY bl.BatchPK, bl.ProductId
  ),
  WghtAgg AS (
    SELECT 
      w.BatchPK, 
      w.ProductId, 
      SUM(w.Quantity) AS factQuantity
    FROM Weightings w
    GROUP BY w.BatchPK, w.ProductId
  ),
  MergedAgg AS (
    SELECT 
      COALESCE(b.BatchPK, w.BatchPK) AS batchId,
      COALESCE(b.ProductId, w.ProductId) AS productId,
      COALESCE(b.planQuantity, 0.0) AS planQuantity,
      COALESCE(w.factQuantity, 0.0) AS factQuantity
    FROM BoilAgg b
    FULL OUTER JOIN WghtAgg w ON b.BatchPK = w.BatchPK AND b.ProductId = w.ProductId
  )
  SELECT COUNT(*) AS [count]
  FROM MergedAgg m
  INNER JOIN Batchs b ON b.BatchPK = m.batchId
  WHERE 
    -- Приведение типов для корректной работы индексов по датам
    (CAST(${startDateParams} AS DATETIME) IS NULL OR b.BatchDate >= CAST(${startDateParams} AS DATETIME))
    AND (CAST(${endDateParams} AS DATETIME) IS NULL OR b.BatchDate < DATEADD(day, 1, CAST(${endDateParams} AS DATETIME)))
    
    -- Строковые фильтры
    AND (${batchNameParam} IS NULL OR b.BatchName LIKE ${batchNameParam})
    AND (${plantParam} IS NULL OR b.Plant = ${plantParam})
    AND (${productIdParam} IS NULL OR m.productId LIKE ${productIdParam})
    
    -- Условие сравнения плана/факта
    AND (
      ${compareParam} = 'false' OR 
      (m.planQuantity <> m.factQuantity OR m.planQuantity IS NULL OR m.factQuantity IS NULL)
    )
  
  -- Заставляем SQL Server строить план под конкретные параметры, убирая Parameter Sniffing
  OPTION (RECOMPILE);
`;

    const rowsResp = await mssqlPrisma.$queryRaw<TApplicationTraceBoilWghtReportRowItem[]>`
  WITH BoilAgg AS (
    SELECT BatchPK, ProductId, SUM(Quantity) AS planQuantity
    FROM Boils
    GROUP BY BatchPK, ProductId
  ),
  WghtAgg AS (
    SELECT BatchPK, ProductId, SUM(Quantity) AS factQuantity
    FROM Weightings
    GROUP BY BatchPK, ProductId
  ),
  MergedAgg AS (
    SELECT 
      COALESCE(b.BatchPK, w.BatchPK) AS batchId,
      COALESCE(b.ProductId, w.ProductId) AS productId,
      COALESCE(b.planQuantity, 0.0) AS planQuantity,
      COALESCE(w.factQuantity, 0.0) AS factQuantity
    FROM BoilAgg b
    FULL OUTER JOIN WghtAgg w ON b.BatchPK = w.BatchPK AND b.ProductId = w.ProductId
  )
  SELECT 
    m.batchId,
    b.BatchName AS batchName,
    p.PlantName AS plantName,
    b.BatchDate AS batchDate,
    m.productId,
    prod.ProductName AS productName,
    m.planQuantity,
    m.factQuantity,
    b.BatchYear AS batchYear,
    b.BatchMonth AS batchMonth,
    b.BatchNumber AS batchNumber
  FROM MergedAgg m
  INNER JOIN Batchs b ON b.BatchPK = m.batchId
  INNER JOIN Products prod ON prod.ProductId = m.productId
  LEFT JOIN Plants p ON p.PlantAlias = b.Plant
  WHERE (CAST(${startDateParams} AS DATETIME) IS NULL OR b.BatchDate >= CAST(${startDateParams} AS DATETIME))
    AND (CAST(${endDateParams} AS DATETIME) IS NULL OR b.BatchDate < DATEADD(day, 1, CAST(${endDateParams} AS DATETIME)))
    AND (${batchNameParam} IS NULL OR b.BatchName LIKE ${batchNameParam})
    AND (${plantParam} IS NULL OR b.Plant = ${plantParam})
    AND (${productIdParam} IS NULL OR m.productId LIKE ${productIdParam})
    AND (
      ${compareParam} = 'false' OR 
      (m.planQuantity <> m.factQuantity OR m.planQuantity IS NULL OR m.factQuantity IS NULL)
    )
  ${orderClause}
  OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY
  OPTION (RECOMPILE)
  ;
`;

    const total = countResp[0]?.count ? Number(countResp[0].count) : 0;

    const totalPages = Math.ceil(total / limit);

    return {
      total,
      totalPages,
      rows: rowsResp,
    };
  }
}
