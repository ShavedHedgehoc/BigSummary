


SELECT
    Weightings.WeightingsPK as weighting_pk,
    Weightings.ContainerPK as container_pk,
    Weightings.ProductId as product_id,
    Products.ProductName as product_name,
    Lots.LotName as lot_name,
    Weightings.Quantity as quantity,
    Authors.AuthorName as author,
    Documents.CreateDate as w_date,
    Cnt_query.records_cnt as records,
    Load_qry.load_date as l_date
FROM
    Weightings
    JOIN
    Batchs
    ON
 Batchs.BatchPK= Weightings.BatchPK
    JOIN Products
    ON
 Products.ProductId = Weightings.ProductId
    JOIN
    Lots
    ON
 Lots.LotPK=Weightings.LotPK
    JOIN
    Documents
    ON
 Documents.DocumentPK=Weightings.DocumentPK
    JOIN Authors
    ON
 Authors.AuthorPK = Documents.AuthorPK
    JOIN
    (SELECT
        ContainerPK as ContPK,
        COUNT (ContainerPk) as records_cnt
    FROM Weightings
    GROUP BY ContainerPK
 ) as Cnt_query
    ON Weightings.ContainerPK=Cnt_query.ContPK
    LEFT JOIN
    (SELECT
        Loads.ContainerPK,
        Documents.CreateDate as load_date
    FROM Loads
        JOIN
        Documents ON Loads.DocumentPK = Documents.DocumentPK
 ) as Load_qry
    ON Load_qry.ContainerPK = Weightings.ContainerPK
WHERE BatchName='1B2' AND Weightings.ProductId = '010329'
ORDER BY Documents.CreateDate ASC

