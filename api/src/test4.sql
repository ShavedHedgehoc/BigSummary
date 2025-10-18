SELECT
    boils_qry.product_id as 'b_product_id'
    , boils_qry.product_name as 'b_product_name'
    , boils_qry.plan_q as 'plan_q'
    , wgh_qry.product_id as 'w_product_id'
    , wgh_qry.product_name as 'w_product_name'
    , wgh_qry.fact as 'fact_q'
FROM
    (
    (SELECT
        Boils.BatchPK as 'batch_id'
            , Boils.ProductId as 'product_id'
            , Products.ProductName as 'product_name' 
            , SUM(Boils.Quantity) as 'plan_q'
    FROM
        Boils
        JOIN
        Products
        ON
            Products.ProductId= Boils.ProductId
    WHERE
            Boils.BatchPK = @batch_id
    GROUP BY 
            Boils.BatchPK,Boils.ProductId,Products.ProductName 
        ) as boils_qry
    FULL JOIN
    (SELECT
        Weightings.BatchPK
            , Weightings.ProductId as 'product_id'
            , Products.ProductName as 'product_name' 
            , SUM(Weightings.Quantity) as 'fact'
    FROM Weightings
        LEFT JOIN
        Products
        ON 
            Products.ProductId = Weightings.ProductId
    WHERE
            Weightings.BatchPK=@batch_id
    GROUP BY 
            Weightings.BatchPK,Weightings.ProductId,Products.ProductName 
        ) AS wgh_qry
    ON 
        wgh_qry.product_id= boils_qry.product_id
    )
ORDER BY
    CASE
        WHEN
            boils_qry.product_name !=''
        THEN
            boils_qry.product_name 
        ELSE
            wgh_qry.product_name 
    END
ASC
