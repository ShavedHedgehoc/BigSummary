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
SELECT COUNT(*)
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