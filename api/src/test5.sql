-- report sql

DECLARE @product_id varchar (50)
DECLARE @bdate date
DECLARE @bname varchar(50)
DECLARE @offset INT
DECLARE @limit INT
DECLARE @compare BIT
SET @product_id = '33'
SET @BDATE = '2022-02-01 00:00:00.000'
SET @bname = 'B2'
SET @offset = 15
SET @limit = 15
SET @compare = 'false'



SELECT RESULT_QUERY.*,
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
from(
        SELECT CASE
                WHEN boils_qry.batch_name != '' THEN boils_qry.batch_name
                ELSE wgh_qry.batch_name
            END AS 'res_batch_name',            
            boils_qry.product_id as 'b_product_id',
            boils_qry.product_name as 'b_product_name',
            boils_qry.plan_q as 'res_plan',            
            wgh_qry.product_id as 'w_product_id',
            wgh_qry.product_name as 'w_product_name',
            wgh_qry.fact as 'res_fact'
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
                            WHERE BatchDate = @bdate
                                AND Batchs.BatchName LIKE '%' + @bname + '%'
                                
                        )
                        AND Products.ProductId LIKE '%' + @product_id + '%'
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
                            WHERE BatchDate = @bdate
                                AND Batchs.BatchName LIKE '%' + @bname + '%'
                        )
                        AND Products.ProductId like '%' + @product_id + '%'
                    GROUP BY Batchs.BatchName,
                        Weightings.BatchPK,
                        Weightings.ProductId,
                        Products.ProductName
                ) AS wgh_qry ON wgh_qry.product_id = boils_qry.product_id
                AND wgh_qry.batch_id = boils_qry.batch_id
            )
        WHERE @compare='false' OR (plan_q != fact
            OR plan_q IS NULL
            OR fact IS NULL)
    ) as RESULT_QUERY
ORDER BY batch_year ASC,
    batch_month ASC,
    batch_number ASC,
    CASE
        WHEN RESULT_QUERY.b_product_name != '' THEN RESULT_QUERY.b_product_name
    END ASC,
    CASE
        WHEN RESULT_QUERY.w_product_name != '' THEN RESULT_QUERY.w_product_name
    END ASC 
OFFSET @offset ROWS 
FETCH NEXT @limit ROWS ONLY