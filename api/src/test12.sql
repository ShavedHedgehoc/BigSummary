declare @StartDate datetime
declare @EndDate datetime
declare @Plant nchar(1)
declare @Author nvarchar(200)
declare @docType nchar(1)

set @StartDate = '2021-06-10 00:00:00.000'
set @EndDate = '2025-31-10 00:00:00.000'
set @Plant='К'

declare @Offset int
declare @Limit int


set @Author='бу'
set @Offset=0
set @Limit=100;

WITH
    Docs
    AS
    (
        SELECT d.DocumentPK, d.AuthorPK
        FROM Documents d
        WHERE (@startDate IS NULL OR d.CreateDate >= @startDate)
            AND (@endDate   IS NULL OR d.CreateDate < DATEADD(day,1,@endDate))
            AND(EXISTS(   
	   SELECT 1
            FROM Doctypes dt
            WHERE
	   dt.DoctypePK=d.DoctypePK
                AND dt.DoctypeAlias = 'Взвешивание'
   ))
            AND (@author    IS NULL OR EXISTS (
          SELECT 1
            FROM Authors a
            WHERE a.AuthorPK = d.AuthorPK
                AND a.AuthorName LIKE CONCAT('%', @author, '%')
        ))
            AND (@plant     IS NULL OR EXISTS (
          SELECT 1
            FROM AuthorOccupations ao
                JOIN Plants p ON p.PlantPK = ao.PlantPK
            WHERE ao.AuthorPK = d.AuthorPK
                AND p.PlantAlias = @plant
        ))
    )
SELECT a.AuthorPK       AS w_author_id,
    a.AuthorName     AS w_name,
    COUNT(w.WeightingsPK)         AS w_rows,
    SUM(w.Quantity)               AS w_total
FROM Docs d
    JOIN Weightings w ON w.DocumentPK = d.DocumentPK
    JOIN Authors a ON a.AuthorPK   = d.AuthorPK
GROUP BY a.AuthorPK, a.AuthorName
ORDER BY w_name
OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;