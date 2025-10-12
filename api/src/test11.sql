DECLARE @StartDate DATETIME, @EndDate DATETIME, @Plant NCHAR(1), @Offset INT = 0, @Limit INT = 10;

SET @StartDate = '2025-07-10';
SET @EndDate = '2025-08-10';
SET @Plant = '';

WITH
    FilteredDocuments
    AS
    (
        SELECT Documents.DocumentPK, Documents.AuthorPK
        FROM Documents
            JOIN Doctypes ON Doctypes.DoctypePK = Documents.DoctypePK
        WHERE (@StartDate = '' OR Documents.CreateDate >= @StartDate)
            AND (@EndDate = '' OR Documents.CreateDate <= @EndDate)
            AND (Doctypes.DoctypeAlias = 'Взвешивание')
    ),
    AuthorWeightings
    AS
    (
        SELECT Authors.AuthorPK AS author_id,
            Authors.AuthorName AS author,
            COUNT(Weightings.WeightingsPK) AS w_rows,
            SUM(Weightings.Quantity) AS total
        FROM FilteredDocuments doc_query
            JOIN Weightings ON doc_query.DocumentPK = Weightings.DocumentPK
            JOIN Authors ON Authors.AuthorPK = doc_query.AuthorPK
            LEFT JOIN AuthorOccupations ON AuthorOccupations.AuthorPK = Authors.AuthorPK
            LEFT JOIN Plants ON Plants.PlantPK = AuthorOccupations.PlantPK
        WHERE (@Plant = '' OR Plants.PlantAlias = @Plant)
        GROUP BY Authors.AuthorPK, Authors.AuthorName
    )
SELECT *
FROM AuthorWeightings
ORDER BY author OFFSET @Offset ROWS FETCH NEXT @Limit ROWS ONLY;



WITH
    FilteredDocuments
    AS
    (
        SELECT Documents.DocumentPK, Documents.AuthorPK
        FROM Documents
            JOIN Doctypes ON Doctypes.DoctypePK = Documents.DoctypePK
        WHERE (@StartDate = '' OR Documents.CreateDate >= @StartDate)
            AND (@EndDate = '' OR Documents.CreateDate <= @EndDate)
            AND (Doctypes.DoctypeAlias = 'Взвешивание')
    ),
    AuthorWeightings
    AS
    (
        SELECT Authors.AuthorPK AS author_id,
            Authors.AuthorName AS author,
            COUNT(Weightings.WeightingsPK) AS w_rows,
            SUM(Weightings.Quantity) AS total
        FROM FilteredDocuments doc_query
            JOIN Weightings ON doc_query.DocumentPK = Weightings.DocumentPK
            JOIN Authors ON Authors.AuthorPK = doc_query.AuthorPK
            LEFT JOIN AuthorOccupations ON AuthorOccupations.AuthorPK = Authors.AuthorPK
            LEFT JOIN Plants ON Plants.PlantPK = AuthorOccupations.PlantPK
        WHERE (@Plant = '' OR Plants.PlantAlias = @Plant)
        GROUP BY Authors.AuthorPK, Authors.AuthorName
    )
SELECT COUNT(*)
FROM AuthorWeightings

-- SELECT COUNT(DISTINCT Documents.AuthorPK)
-- FROM Documents
--     JOIN Weightings ON Weightings.DocumentPK = Documents.DocumentPK
--     JOIN Doctypes ON Doctypes.DoctypePK=Documents.DoctypePK
--     JOIN Authors ON Authors.AuthorPK=Documents.AuthorPK
--     LEFT JOIN AuthorOccupations ON AuthorOccupations.AuthorPK=Authors.AuthorPK
--     LEFT JOIN Plants ON Plants.PlantPK=AuthorOccupations.PlantPK
-- WHERE (@StartDate=''OR Documents.CreateDate >= @StartDate)
--     AND (@EndDate='' OR Documents.CreateDate <= @EndDate)
--     AND (Doctypes.DoctypeAlias='Взвешивание')
--     AND (@Plant=''OR Plants.PlantAlias=@Plant);