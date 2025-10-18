-- count sql

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

        SELECT COUNT(*)
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
   
