ALTER VIEW [dbo].[vw_FinalBatchStatus] AS
WITH
  AllKeys AS (
    SELECT
      BatchPK,
      ProductId
    FROM
      [dbo].[vw_PlanAggregated]
    WITH
      (NOEXPAND)
    UNION
    SELECT
      BatchPK,
      ProductId
    FROM
      [dbo].[vw_FactWeighting]
    WITH
      (NOEXPAND)
    UNION
    SELECT
      BatchPK,
      ProductId
    FROM
      [dbo].[vw_factLoading]
    WITH
      (NOEXPAND)
  )
SELECT
  k.BatchPK,
  b.BatchName,
  b.BatchDate,
  b.BatchYear,
  b.BatchMonth,
  b.BatchNumber,
  b.Plant,
  pr.ProductId AS BatchProductId,
  pr.ProductMarking AS BatchProductMarking,
  k.ProductId,
  ppr.ProductName,
  ppr.ProductMarking,
  ISNULL(p.TotalPlanned, 0) AS TotalPlanned,
  ISNULL(w.TotalWeighting, 0) AS TotalWeighting,
  ISNULL(l.TotalLoading, 0) AS TotalLoading,
  CASE
    WHEN ISNULL(w.TotalWeighting, 0) <> ISNULL(p.TotalPlanned, 0)
    AND ISNULL(l.TotalLoading, 0) <> ISNULL(p.TotalPlanned, 0) THEN 'BOTH_MISMATCH'
    WHEN ISNULL(w.TotalWeighting, 0) <> ISNULL(p.TotalPlanned, 0) THEN 'WEIGHT_MISMATCH'
    WHEN ISNULL(l.TotalLoading, 0) <> ISNULL(p.TotalPlanned, 0) THEN 'LOADING_MISMATCH'
    ELSE 'OK'
  END AS ProblemStatus
FROM
  AllKeys k
  INNER JOIN dbo.Batchs b ON b.BatchPK = k.BatchPK
  LEFT JOIN dbo.BtProducts bpr ON bpr.BatchPK = b.BatchPK
  LEFT JOIN dbo.products pr ON pr.ProductId = bpr.ProductId
  LEFT JOIN dbo.products ppr ON ppr.ProductId = k.ProductId
  LEFT JOIN [dbo].[vw_PlanAggregated] p
WITH
  (NOEXPAND) ON k.BatchPK = p.BatchPK
  AND k.ProductId = p.ProductId
  LEFT JOIN [dbo].[vw_FactWeighting] w
WITH
  (NOEXPAND) ON k.BatchPK = w.BatchPK
  AND k.ProductId = w.ProductId
  LEFT JOIN [dbo].[vw_factLoading] l
WITH
  (NOEXPAND) ON k.BatchPK = l.BatchPK
  AND k.ProductId = l.ProductId;

GO
