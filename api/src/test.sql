WITH
    Docs
    AS
    (
        SELECT d.DocumentPK,
            d.AuthorPK
        FROM Documents 
d JOIN Doctypes dt
            ON dt.DoctypePK = d.DoctypePK
                AND dt.DoctypeAlias = N'Взвешивание'
            LEFT JOIN AuthorOccupations ao ON ao.AuthorPK = d.AuthorPK
            LEFT JOIN Plants p ON p.PlantPK = ao.PlantPK
        WHERE (@StartDate IS NULL OR d.CreateDate >= @StartDate)
            AND (@EndDate IS NULL OR d.CreateDate < DATEADD(day,1,@EndDate))
            AND (@Author IS NULL OR EXISTS ( SELECT 1
            FROM Authors a
            WHERE a.AuthorPK = d.AuthorPK AND a.AuthorName LIKE CONCAT('%', @Author, '%') ))
            AND (@Plant IS NULL OR p.PlantAlias = @Plant)
    ),
    WeightAgg
    AS
    (
        SELECT
            d.AuthorPK,

            COUNT
(*) AS w_rows,
            SUM(w.Quantity) AS w_total,
            MIN(w.WeightingsPK) AS min_wpk,
            MAX(w.WeightingsPK) AS max_wpk
        FROM Docs d
            JOIN Weightings w ON w.DocumentPK = d.DocumentPK
        GROUP BY d.AuthorPK
    )
SELECT a.AuthorPK AS w_author_id,
    a.AuthorName AS w_name,
    wa.w_rows, wa.w_total,
    wmin.DocumentPK AS w_start_pk,
    dmin.CreateDate AS w_start_date,
    dmax.CreateDate AS w_end_date
FROM WeightAgg wa
    JOIN Authors a ON a.AuthorPK = wa.AuthorPK
    JOIN Weightings wmin ON wmin.WeightingsPK = wa.min_wpk
    JOIN Documents dmin ON dmin.DocumentPK = wmin.DocumentPK
    JOIN Weightings wmax ON wmax.WeightingsPK = wa.max_wpk
    JOIN Documents dmax ON dmax.DocumentPK = wmax.DocumentPK
ORDER BY wa.w_rows DESC, a.AuthorPK 
OFFSET @Offset ROWS FETCH NEXT @Limit ROWS ONLY;
-- SELECT *
-- FROM
--     (SELECT
--         Batchs.BatchPK as 'batch_id',
--         Batchs.BatchName as 'name',
--         Products.ProductMarking as 'marking',
--         Batchs.BatchDate as 'date',
--         Plants.PlantName as 'plant',
--         CASE
-- 		WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='A' THEN 'A'
-- 		WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='B' THEN 'B'
-- 		WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='C' THEN 'C'
-- 		WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='D' THEN 'D'
-- 		WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='E' THEN 'E'
-- 		WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='F' THEN 'F'
-- 		WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='J' THEN 'J'
-- 		WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='H' THEN 'H'
-- 		WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='I' THEN 'I'
-- 		WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='J' THEN 'J'
-- 		WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='K' THEN 'K'
--         WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='L' THEN 'L'
-- 		ELSE 
-- 			CASE
-- 				WHEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='X' 
-- 				THEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)
-- 				WHEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='Y' 
-- 				THEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)
-- 				WHEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='Z' 
-- 				THEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)

-- 				WHEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,2)='RS' 
-- 				THEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-3,1)
-- 				WHEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,2)='SR' 
-- 				THEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-3,1)
-- 				WHEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='S' 
-- 				THEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)
-- 				WHEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='A' 
-- 				THEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)
-- 				WHEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='R' 
-- 				THEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)
-- 				ELSE 'XZ'
-- 			END
-- 		END AS 'batch_month',
--         CASE        
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='7'
--         THEN
--             CAST('2017' AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='8'
--         THEN
--             CAST('2018' AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='9'
--         THEN
--             CAST('2019' AS INT)    
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='X'
--         THEN
--             CAST ('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='Y'
--         THEN
--             CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='Z'
--         THEN
--             CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,2)='RS'
--         THEN
--             CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-2,1) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,2)='SR'
--         THEN
--             CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-2,1) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='S'
--         THEN
--             CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='A'
--         THEN
--             CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='R'
--         THEN
--             CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
--         ELSE
--             CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1) AS INT)            
--     END AS 'batch_year',
--         CASE        
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='X'
--         THEN
--             CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='Y'
--         THEN
--             CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='Z'
--         THEN
--             CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,2)='RS'
--         THEN
--             CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-3) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,2)='SR'
--         THEN
--             CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-3) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='S'
--         THEN
--             CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='A'
--         THEN
--             CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='R'
--         THEN
--             CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
--         ELSE
--             CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-1) AS INT)
--     END AS 'batch_number'
--     FROM
--         Batchs
--         JOIN
--         Plants ON Plants.PlantAlias = Batchs.Plant
--         JOIN
--         BtProducts ON Batchs.BatchPK = BtProducts.BatchPK
--         JOIN
--         Products ON Products.ProductId = BtProducts.ProductId
-- -- ORDER BY 'batch_year' ASC, 'batch_month' ASC, 'batch_number' ASC
-- ) AS TMP_QRY
-- WHERE TMP_QRY.batch_month='A'
-- ORDER BY TMP_QRY.batch_year ASC, TMP_QRY.batch_month ASC, TMP_QRY.batch_number ASC





-- SELECT TMP_QRY_2.*, Plants.PlantName
-- FROM
--     (SELECT TMP_QRY.*
--     -- , Plants.PlantName, Products.ProductMarking
--     FROM
--         (SELECT
--             Batchs.BatchPK as 'batch_id',
--             Batchs.BatchName as 'batch_name',
--             Batchs.BatchDate as 'batch_date',
--             Batchs.Plant as 'plant',
--             CASE
-- 		WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='A' THEN 'A'
-- 		WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='B' THEN 'B'
-- 		WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='C' THEN 'C'
-- 		WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='D' THEN 'D'
-- 		WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='E' THEN 'E'
-- 		WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='F' THEN 'F'
-- 		WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='J' THEN 'J'
-- 		WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='H' THEN 'H'
-- 		WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='I' THEN 'I'
-- 		WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='J' THEN 'J'
-- 		WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='K' THEN 'K'
--         WHEN
-- 		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='L' THEN 'L'
-- 		ELSE 
-- 			CASE
-- 				WHEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='X' 
-- 				THEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)
-- 				WHEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='Y' 
-- 				THEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)
-- 				WHEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='Z' 
-- 				THEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)

-- 				WHEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,2)='RS' 
-- 				THEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-3,1)
-- 				WHEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,2)='SR' 
-- 				THEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-3,1)
-- 				WHEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='S' 
-- 				THEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)
-- 				WHEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='A' 
-- 				THEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)
-- 				WHEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName),1)='R' 
-- 				THEN 
-- 				SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-2,1)
-- 				ELSE 'XZ'
-- 			END
-- 		END AS 'batch_month',
--             CASE        
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='7'
--         THEN
--             CAST('2017' AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='8'
--         THEN
--             CAST('2018' AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='9'
--         THEN
--             CAST('2019' AS INT)    
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='X'
--         THEN
--             CAST ('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='Y'
--         THEN
--             CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='Z'
--         THEN
--             CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,2)='RS'
--         THEN
--             CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-2,1) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,2)='SR'
--         THEN
--             CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-2,1) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='S'
--         THEN
--             CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='A'
--         THEN
--             CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='R'
--         THEN
--             CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,1) AS INT)
--         ELSE
--             CAST('202'+SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1) AS INT)            
--     END AS 'batch_year',
--             CASE        
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='X'
--         THEN
--             CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='Y'
--         THEN
--             CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='Z'
--         THEN
--             CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,2)='RS'
--         THEN
--             CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-3) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName)-1,2)='SR'
--         THEN
--             CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-3) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='S'
--         THEN
--             CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='A'
--         THEN
--             CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
--         WHEN
--             SUBSTRING(Batchs.BatchName,LEN(Batchs.BatchName),1)='R'
--         THEN
--             CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-2) AS INT)
--         ELSE
--             CAST(SUBSTRING(Batchs.BatchName,0,LEN(Batchs.BatchName)-1) AS INT)
--     END AS 'batch_number'
--         FROM
--             Batchs) AS TMP_QRY
--     -- JOIN
--     --     Plants ON Plants.PlantAlias = TMP_QRY.plant
--     --     JOIN
--     --     BtProducts ON TMP_QRY.batch_id = BtProducts.BatchPK
--     --     JOIN
--     --     Products ON Products.ProductId = BtProducts.ProductId
--     WHERE TMP_QRY.batch_month='A' AND TMP_QRY.batch_year=2025) AS TMP_QRY_2
--     JOIN
--     Plants ON Plants.PlantAlias = TMP_QRY_2.plant
-- WHERE
--         Plants.PlantAlias='К'
-- JOIN
--         BtProducts ON TMP_QRY.batch_id = BtProducts.BatchPK
--         JOIN
--         Products ON Products.ProductId = BtProducts.ProductId
--     -- ORDER BY TMP_QRY.batch_year ASC, TMP_QRY.batch_month ASC, TMP_QRY.batch_number ASC





-- -- WHERE TMP_QRY.batch_month='A'
-- -- ORDER BY TMP_QRY.batch_year ASC, TMP_QRY.batch_month ASC, TMP_QRY.batch_number ASC


SELECT TMP_QRY_3.*
, BtProducts.ProductId
, Products.ProductMarking
FROM
    (SELECT TMP_QRY_2.*, Plants.PlantName
    FROM
        (SELECT TMP_QRY.*
        -- , Plants.PlantName, Products.ProductMarking
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
		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='J' THEN 'J'
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
                Batchs) AS TMP_QRY
        WHERE TMP_QRY.batch_month LIKE '%A%' AND TMP_QRY.batch_year=2025 AND TMP_QRY.plant='К'
        
        ) AS TMP_QRY_2
        JOIN
        Plants ON Plants.PlantAlias = TMP_QRY_2.plant
		) AS TMP_QRY_3
    JOIN
    BtProducts ON TMP_QRY_3.batch_id = BtProducts.BatchPK
    JOIN
    Products ON Products.ProductId = BtProducts.ProductId
WHERE
 Products.ProductMarking LIKE '%1000%'
ORDER BY TMP_QRY_3.batch_year ASC, TMP_QRY_3.batch_month ASC, TMP_QRY_3.batch_number ASC



SELECT COUNT (TMP_QRY_3.batch_id)
FROM
    (SELECT TMP_QRY_2.*, Plants.PlantName
    FROM
        (SELECT TMP_QRY.*
        -- , Plants.PlantName, Products.ProductMarking
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
		SUBSTRING(Batchs.BatchName, LEN(Batchs.BatchName)-1,1)='J' THEN 'J'
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
                Batchs) AS TMP_QRY
        -- JOIN
        --     Plants ON Plants.PlantAlias = TMP_QRY.plant
        --     JOIN
        --     BtProducts ON TMP_QRY.batch_id = BtProducts.BatchPK
        --     JOIN
        --     Products ON Products.ProductId = BtProducts.ProductId
        WHERE TMP_QRY.batch_month='A' AND TMP_QRY.batch_year=2025 AND TMP_QRY.plant='К') AS TMP_QRY_2
        JOIN
        Plants ON Plants.PlantAlias = TMP_QRY_2.plant

		) AS TMP_QRY_3
    JOIN
    BtProducts ON TMP_QRY_3.batch_id = BtProducts.BatchPK
    JOIN
    Products ON Products.ProductId = BtProducts.ProductId
WHERE
 Products.ProductMarking LIKE '%1000%'


declare @SearchDescription varchar(50)
set @SearchDescription=null

SELECT *
FROM
    (SELECT TMP_QRY_2.*
    FROM
        (SELECT TMP_QRY.*
        -- , Plants.PlantName, Products.ProductMarking
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
                Batchs) AS TMP_QRY
        -- JOIN
        --     Plants ON Plants.PlantAlias = TMP_QRY.plant
        --     JOIN
        --     BtProducts ON TMP_QRY.batch_id = BtProducts.BatchPK
        --     JOIN
        --     Products ON Products.ProductId = BtProducts.ProductId
        --WHERE TMP_QRY.batch_month LIKE'%%' AND TMP_QRY.batch_year LIKE '%%' AND TMP_QRY.plant LIKE '%%' AND TMP_QRY.batch_number LIKE '%9999%'
		--where TMP_QRY.batch_id='566767'
		) AS TMP_QRY_2
        --JOIN
        --Plants ON Plants.PlantAlias = TMP_QRY_2.plant

		) AS TMP_QRY_3
    left JOIN
    BtProducts
    ON TMP_QRY_3.batch_id = BtProducts .BatchPK
    left JOIN
    Products ON Products.ProductId = BtProducts.ProductId
--   (select 
--   BtProducts.BatchPk, 
--   Products.ProductId,
--   Products.ProductMarking

--   from  BtProducts 
--     JOIN
--    Products ON Products.ProductId = BtProducts.ProductId) as BT
--	ON TMP_QRY_3.batch_id = BT.BatchPK


WHERE (@SearchDescription IS NULL OR Products.ProductMarking like '%'+@SearchDescription+'%')
ORDER BY TMP_QRY_3.batch_year ASC, TMP_QRY_3.batch_month ASC, TMP_QRY_3.batch_number ASC


