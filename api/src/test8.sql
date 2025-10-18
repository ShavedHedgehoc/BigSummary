declare @StartDate datetime
declare @EndDate datetime
set @StartDate = '2025-01-10'
set @EndDate = '2025-07-10'


SELECT
    Authors.AuthorPK as author_id,
    Authors.AuthorName as author,
    COUNT(Weightings.WeightingsPK) as w_rows,
    SUM(Weightings.Quantity) as total
FROM
    Documents
    right JOIN Weightings ON Documents.DocumentPK = Weightings.DocumentPK
    JOIN Authors ON Authors.AuthorPK = Documents.AuthorPK
WHERE
    (@StartDate=''OR Documents.CreateDate >= @StartDate)
    AND
    (@EndDate='' OR Documents.CreateDate <= @EndDate)
GROUP BY    
    Authors.AuthorPK,
    Authors.AuthorName
ORDER BY
    Authors.AuthorName

SELECT
    COUNT(*)
FROM
    (SELECT
        Authors.AuthorPK as author_id,
        Authors.AuthorName as author,
        COUNT(Weightings.WeightingsPK) as w_rows,
        SUM(Weightings.Quantity) as total
    FROM
        Documents
        right JOIN Weightings ON Documents.DocumentPK = Weightings.DocumentPK
        JOIN Authors ON Authors.AuthorPK = Documents.AuthorPK
    WHERE
    (@StartDate=''OR Documents.CreateDate >= @StartDate)
        AND
        (@EndDate='' OR Documents.CreateDate <= @EndDate)
    GROUP BY    
    Authors.AuthorPK,
    Authors.AuthorName
) as ddd




-- select
--     wght_qry.DocumentPK,
--     wght_qry.CreateDate,
--     wght_qry.AuthorName,
--     COUNT(WeightingsPK) as cnt
-- from
--     (SELECT
--         Documents.DocumentPK,
--         Documents.CreateDate,
--         Authors.AuthorName
--     FROM [maindb].[dbo].[Documents]
--         JOIN Doctypes ON Doctypes.DoctypePK = Documents.DoctypePK
--         JOIN Authors ON Authors.AuthorPK = Documents.AuthorPK
--     WHERE
-- Doctypes.DoctypeAlias = 'Взвешивание'
--         AND
--         (@StartDate=''OR Documents.CreateDate >= @StartDate)
--         AND
--         (@EndDate='' OR Documents.CreateDate <= @EndDate)
--    ) AS wght_qry
--     JOIN Weightings ON Weightings.DocumentPK = wght_qry.DocumentPK
-- GROUP BY
-- wght_qry.DocumentPK,
-- wght_qry.CreateDate,
-- wght_qry.AuthorName


-- SELECT
--     Documents.CreateDate as w_date,
--     Authors.AuthorName as author,
--     Products.ProductId as product_id,
--     Products.ProductName as product_name,
--     Weightings.Quantity
-- FROM
--     Weightings
--     JOIN Documents ON Documents.DocumentPK = Weightings.DocumentPK
--     JOIN Authors ON Authors.AuthorPK = Documents.AuthorPK
--     JOIN Products ON Weightings.ProductId = Products.ProductId
-- WHERE
-- (@StartDate=''OR Documents.CreateDate >= @StartDate)
-- AND
-- (@EndDate='' OR Documents.CreateDate <= @EndDate)
-- ORDER BY

-- Authors.AuthorName ASC,
-- Documents.CreateDate ASC


-- SELECT
--     Authors.AuthorPK as author_id,
--     Authors.AuthorName as author,
--     COUNT(Weightings.WeightingsPK) as w_rows,
--     SUM(Weightings.Quantity) as total
-- FROM
--     Weightings
--     LEFT JOIN Documents ON Documents.DocumentPK = Weightings.DocumentPK
--     LEFT JOIN Authors ON Authors.AuthorPK = Documents.AuthorPK
-- WHERE
--     (@StartDate=''OR Documents.CreateDate >= @StartDate)
--     AND
--     (@EndDate='' OR Documents.CreateDate <= @EndDate)
-- GROUP BY
--     Authors.AuthorName,
--     Authors.AuthorPK




-- SELECT COUNT(www.author_id)
-- FROM
--     (
--     SELECT
--         Authors.AuthorPK as author_id
--     -- ,
--     -- Authors.AuthorName as author
--     -- ,
--     -- COUNT(Weightings.WeightingsPK) as w_rows,
--     -- SUM(Weightings.Quantity) as total
--     FROM
--         Weightings
--         LEFT JOIN Documents ON Documents.DocumentPK = Weightings.DocumentPK
--         LEFT JOIN Authors ON Authors.AuthorPK = Documents.AuthorPK
--     WHERE
--     (@StartDate=''OR Documents.CreateDate >= @StartDate)
--         AND
--         (@EndDate='' OR Documents.CreateDate <= @EndDate)
--     GROUP BY 
--         Authors.AuthorPK
--         ) as www
    
--     -- GROUP BY
--     -- -- Authors.AuthorName,
--     -- Authors.AuthorPK









