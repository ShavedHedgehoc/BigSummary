declare @StartDate datetime
declare @EndDate datetime
declare @Plant nchar(1)

set @StartDate = '2021-07-10'
set @EndDate = '2025-08-10'
set @Plant=''

declare @Offset int
declare @Limit int



set @Offset=0
set @Limit=10

SELECT *
FROM
    (SELECT
        Authors.AuthorPK as author_id,
        Authors.AuthorName as author,
        COUNT(Weightings.WeightingsPK) as w_rows,
        SUM(Weightings.Quantity) as total
    FROM
        (SELECT
            Documents.DocumentPK,
            Documents.AuthorPK
        FROM
            Documents
            JOIN
            Doctypes ON Doctypes.DoctypePK=Documents.DoctypePK
            JOIN Authors ON Authors.AuthorPK = Documents.AuthorPK
            LEFT JOIN AuthorOccupations ON AuthorOccupations.AuthorPK = Authors.AuthorPK
            LEFT JOIN Plants ON Plants.PlantPK = AuthorOccupations.PlantPK
        WHERE
    (@StartDate=''OR Documents.CreateDate >= @StartDate)
            AND
            (@EndDate='' OR Documents.CreateDate <= @EndDate)
            AND
            (Doctypes.DoctypeAlias= 'Взвешивание')
            AND
            (@Plant=''OR Plants.PlantAlias = @Plant)
	) as doc_query
        JOIN Weightings ON doc_query.DocumentPK = Weightings.DocumentPK
        JOIN Authors ON Authors.AuthorPK = doc_query.AuthorPK
    GROUP BY    
    Authors.AuthorPK,
    Authors.AuthorName
	) as w_query
ORDER BY
    w_query.author
OFFSET @Offset ROWS
FETCH NEXT @Limit ROWS ONLY

SELECT COUNT(DISTINCT Documents.AuthorPK)
FROM
    Documents
    JOIN
    Weightings ON Weightings.DocumentPK = Documents.DocumentPK
    JOIN
    Doctypes ON Doctypes.DoctypePK=Documents.DoctypePK
    JOIN Authors ON Authors.AuthorPK = Documents.AuthorPK
    LEFT JOIN AuthorOccupations ON AuthorOccupations.AuthorPK = Authors.AuthorPK
    LEFT JOIN Plants ON Plants.PlantPK = AuthorOccupations.PlantPK
WHERE
(@StartDate=''OR Documents.CreateDate >= @StartDate)
    AND
    (@EndDate='' OR Documents.CreateDate <= @EndDate)
    AND
    (Doctypes.DoctypeAlias= 'Взвешивание')
    AND
    (@Plant=''OR Plants.PlantAlias = @Plant)

