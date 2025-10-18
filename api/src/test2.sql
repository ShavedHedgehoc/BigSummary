-- ROWS QUERY

declare @Batch varchar(50)
declare @Marking varchar(50)
declare @StartDate datetime
declare @EndDate datetime
declare @Month varchar(50)
declare @Year varchar(50)
declare @Plant varchar(50)
declare @Offset int
declare @Limit int


set @Batch='2'
set @Marking=''
set @StartDate = ''
set @EndDate = ''
set @Month=''
set @Year=''
set @Plant='К'
set @Offset=0
set @Limit=10



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
                (@Batch='' OR Batchs.BatchName LIKE '%'+@Batch+'%')
                AND
                (@StartDate=''OR Batchs.BatchDate >= @StartDate)
                AND
                (@EndDate=''OR Batchs.BatchDate <= @EndDate)
                AND
                (@Plant=''OR Batchs.Plant = @Plant)
            ) AS TMP_QRY
        WHERE
        (@Month='' OR TMP_QRY.batch_month=@Month)
            AND
            (@Year='' OR TMP_QRY.batch_year=CAST(@Year AS INT))    
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
    (@Marking IS NULL OR Products.ProductMarking like '%'+@Marking+'%')
ORDER BY 
    TMP_QRY_3.batch_year ASC, 
    TMP_QRY_3.batch_month ASC, 
    TMP_QRY_3.batch_number ASC
OFFSET @Offset ROWS
FETCH NEXT @Limit ROWS ONLY