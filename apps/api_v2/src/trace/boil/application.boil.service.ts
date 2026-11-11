import { Injectable } from '@nestjs/common';
import { mssqlPrisma, Prisma } from '@repo/db-mssql';
import {
  TApplicationTraceBoilWghtReportResponse,
  TApplicationTraceBoilWghtReportRowItem,
  TApplicationUploadTraceBoilInput,
  TApplicationUploadTraceBoilResponse,
  TGetApplicationGetTraceBoilWghtReportInput,
} from '@repo/schemas';
import { IApplicationTraceBoilService } from '@repo/trpc';
import * as xmljs from 'xml-js';

interface SqlProcedureResult {
  result: number;
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

    const offset = limit * (page - 1);

    let startDateParam: Date | null = null;
    if (startDate) {
      startDateParam = new Date(startDate);
      startDateParam.setUTCHours(0, 0, 0, 0);
    }

    let endDateParam: Date | null = null;
    if (endDate) {
      endDateParam = new Date(endDate);
      endDateParam.setUTCDate(endDateParam.getUTCDate() + 1);
    }

    const batchNameParam = batchName ? `%${batchName}%` : null;
    const plantParam = plants?.length ? plants[0] : null;
    const productIdParam = productId ? `%${productId}%` : null;
    const compareParam = compare ? 'true' : 'false';

    const orderClause = sortByBatch
      ? Prisma.raw('b.BatchYear ASC, b.BatchMonth ASC, b.BatchNumber ASC, prod.ProductName ASC')
      : Prisma.raw('prod.ProductName ASC, b.BatchYear ASC, b.BatchMonth ASC, b.BatchNumber ASC');

    const countResp = await mssqlPrisma.$queryRaw<[{ count: number }]>`
      WITH FilteredBatches AS (
        SELECT BatchPK, BatchName, Plant, BatchDate, BatchYear, BatchMonth, BatchNumber
        FROM Batchs
        WHERE (CAST(${startDateParam} AS DATETIME) IS NULL OR BatchDate >= CAST(${startDateParam} AS DATETIME))
          AND (CAST(${endDateParam} AS DATETIME) IS NULL OR BatchDate < CAST(${endDateParam} AS DATETIME))
          AND (${batchNameParam} IS NULL OR BatchName LIKE CAST(${batchNameParam} AS VARCHAR(255)))
          AND (${plantParam} IS NULL OR Plant = CAST(${plantParam} AS VARCHAR(100)))
      ),
      BoilAgg AS (
        SELECT bl.BatchPK, bl.ProductId, SUM(bl.Quantity) AS planQuantity
        FROM Boils bl
        INNER JOIN FilteredBatches b ON b.BatchPK = bl.BatchPK
        WHERE (${productIdParam} IS NULL OR bl.ProductId LIKE CAST(${productIdParam} AS VARCHAR(50)))
        GROUP BY bl.BatchPK, bl.ProductId
      ),
      WghtAgg AS (
        SELECT w.BatchPK, w.ProductId, SUM(w.Quantity) AS factQuantity
        FROM Weightings w
        INNER JOIN FilteredBatches b ON b.BatchPK = w.BatchPK
        WHERE (${productIdParam} IS NULL OR w.ProductId LIKE CAST(${productIdParam} AS VARCHAR(50)))
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
      WHERE (${compareParam} = 'false' OR (m.planQuantity <> m.factQuantity OR m.planQuantity IS NULL OR m.factQuantity IS NULL))
      OPTION (RECOMPILE);
    `;

    const total = Number(countResp[0]?.count || 0);
    const totalPages = Math.ceil(total / limit);

    if (total === 0) {
      return { total, totalPages, rows: [] };
    }

    const rows = await mssqlPrisma.$queryRaw<TApplicationTraceBoilWghtReportRowItem[]>`
      WITH FilteredBatches AS (
        SELECT BatchPK, BatchName, Plant, BatchDate, BatchYear, BatchMonth, BatchNumber
        FROM Batchs
        WHERE (CAST(${startDateParam} AS DATETIME) IS NULL OR BatchDate >= CAST(${startDateParam} AS DATETIME))
          AND (CAST(${endDateParam} AS DATETIME) IS NULL OR BatchDate < CAST(${endDateParam} AS DATETIME))
          AND (${batchNameParam} IS NULL OR BatchName LIKE CAST(${batchNameParam} AS VARCHAR(255)))
          AND (${plantParam} IS NULL OR Plant = CAST(${plantParam} AS VARCHAR(100)))
      ),
      BoilAgg AS (
        SELECT bl.BatchPK, bl.ProductId, SUM(bl.Quantity) AS planQuantity
        FROM Boils bl
        INNER JOIN FilteredBatches b ON b.BatchPK = bl.BatchPK
        WHERE (${productIdParam} IS NULL OR bl.ProductId LIKE CAST(${productIdParam} AS VARCHAR(50)))
        GROUP BY bl.BatchPK, bl.ProductId
      ),
      WghtAgg AS (
        SELECT w.BatchPK, w.ProductId, SUM(w.Quantity) AS factQuantity
        FROM Weightings w
        INNER JOIN FilteredBatches b ON b.BatchPK = w.BatchPK
        WHERE (${productIdParam} IS NULL OR w.ProductId LIKE CAST(${productIdParam} AS VARCHAR(50)))
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
      SELECT 
        m.batchId,
        b.BatchName AS batchName,
        -- b.Plant AS plantName,
        pl.PlantName AS plantName,
        b.BatchDate AS batchDate,
        m.productId,
        COALESCE(prod.ProductName, '') AS productName,
        CAST(m.planQuantity AS FLOAT) AS planQuantity,
        CAST(m.factQuantity AS FLOAT) AS factQuantity,
        b.BatchYear AS batchYear,
        b.BatchMonth AS batchMonth,
        b.BatchNumber AS batchNumber
      FROM MergedAgg m
      INNER JOIN FilteredBatches b ON b.BatchPK = m.batchId
      LEFT JOIN Products prod ON prod.ProductId = m.productId
      LEFT JOIN Plants pl ON b.Plant = pl.PlantAlias
      WHERE (${compareParam} = 'false' OR (m.planQuantity <> m.factQuantity OR m.planQuantity IS NULL OR m.factQuantity IS NULL))
      ORDER BY ${orderClause}
      ${getAllRows ? Prisma.empty : Prisma.raw(`OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`)}
      OPTION (RECOMPILE);
    `;

    return {
      total,
      totalPages,
      rows,
    };
  }

  async uploadTraceBoils(
    input: TApplicationUploadTraceBoilInput,
  ): Promise<TApplicationUploadTraceBoilResponse> {
    const options = { compact: true };
    const xml = xmljs.js2xml(input, options);
    const qry = `EXEC dbo.InsertBoilsXml3 @documentXml = @p1, @result = @p2;`;
    const results = await mssqlPrisma.$queryRawUnsafe<SqlProcedureResult[]>(qry, xml, 0);

    if (!results || results.length === 0) {
      return null;
    }
    const dbResult = results[0].result;
    return {
      value: dbResult,
    };
  }
}
