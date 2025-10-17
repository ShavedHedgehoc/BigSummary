USE [testdb]
GO

/****** Object:  StoredProcedure [dbo].[InsertBoilsXml2]    Script Date: 14.10.2025 18:31:55 ******/


declare @documentXml xml;
declare @result int
set @result=0
set @documentXml= '<document><batch_record apparatus="3" batch="729J5" date="2025-10-15 00:00:00" fin_productid="8829" marking="EL6/75" plan="25000.0" plant="П"><row><productid>55456</productid><productname>Основа орг. для PRINCE , кг</productname><quantity> 389.60000</quantity></row><row><productid>70937</productid><productname>Отдушка Tropical evasion SOM 000923</productname><quantity>  6.49000</quantity></row><row><productid>765</productid><productname>Флонак EP-10 (IRIODIN 100, TAIZHU 1005 silver white, N-800S, AG100ND8WA)</productname><quantity> 19.48100</quantity></row><row><productid>3076</productid><productname>Гидросульфит натрия (Натрия дитионит)</productname><quantity>  1.30000</quantity></row><row><productid>5388</productid><productname>Сульфит натрия (ТЕХ)</productname><quantity>  5.84000</quantity></row><row><productid>107</productid><productname>Трилон Б (VERSENE POWEDER Хелат NA4EDTA, DISSOLVINE, ETDA, ЭДТА)</productname><quantity>  1.30000</quantity></row><row><productid>108</productid><productname>Изоаскорбат натрия (Sodium Erythorbate)</productname><quantity>  7.15000</quantity></row><row><productid>1869</productid><productname>Гуар N-Hance 3205 (CG13, COSMEDIA, GUAR C 261N, Загуститель Эсафлор EC3, Esaflor)</productname><quantity>  4.68000</quantity></row><row><productid>29220</productid><productname>Кислота ортофосфорная (ЧДА)</productname><quantity>  0.47000</quantity></row><row><productid>50</productid><productname>Краситель ПФДА (Rodol D type J, Chemibroxc РРD, CAS 106-50-3)</productname><quantity>  5.19500</quantity></row><row><productid>51</productid><productname>Краситель резорцин (Rodol RS, Chemibroxc RS, Резорцинол)</productname><quantity>  1.94800</quantity></row><row><productid>1631</productid><productname>Краситель 2A3PYR (Chemibrox 2A3НPYR, 2A3HP) (CAS 16867-03-1)</productname><quantity>  1.55900</quantity></row><row><productid>45</productid><productname>Краситель м-аминофенол (EG) (Chemibrox MAP)(CI 76545) (CAS 591-27-5)</productname><quantity>  1.94800</quantity></row><row><productid>753</productid><productname>Аммиак водный</productname><quantity> 76.40000</quantity></row><row><productid>1897</productid><productname>ПЭГ-400</productname><quantity> 19.50000</quantity></row><row><productid>2359</productid><productname>Этоксидигликоль (Carbitol CG, Моноэтиловый эфир)</productname><quantity> 57.10000</quantity></row><row><productid>451</productid><productname>Цетримониум хлорид (Dehyguart, MICROCARE, ТОРКВАТ, СТС 25, СТС 50, Arguad 16-29)</productname><quantity> 32.50000</quantity></row><row><productid>15029</productid><productname>Масло семян камелии</productname><quantity>  0.13000</quantity></row><row><productid>2655</productid><productname>Глицерин (PALMERA G995V)</productname><quantity> 19.50000</quantity></row><row><productid>4113</productid><productname>Экстракт шелка COS (Силкерин ХЛ, протеин шелка)</productname><quantity>  0.13000</quantity></row></batch_record></document>';
BEGIN
    SET NOCOUNT ON;
    DECLARE @BatchName varchar(50)
    DECLARE @BatchDate datetime2
    DECLARE @Plant varchar(50)
    DECLARE @Fin_ProductId varchar(50)
    DECLARE @Marking varchar(50)


    SET @BatchName =  @documentXml.value('(document/batch_record/@batch)[1]','varchar(50)')
    SET @BatchDate =  Parse(@documentXml.value('(document/batch_record/@date)[1]','varchar(50)') as datetime2)
    SET @Plant =  @documentXml.value('(document/batch_record/@plant)[1]','varchar(50)')
    SET @Fin_ProductId =  RIGHT('000000'+cast(@documentXml.value('(document/batch_record/@fin_productid)[1]','varchar(6)') as varchar),6)
    SET @Marking =  @documentXml.value('(document/batch_record/@marking)[1]','varchar(50)')

    IF OBJECT_ID('tempdb.dbo.#BoilsSummary', 'U') IS NOT NULL
		DROP TABLE #BoilsSummary;



    BEGIN TRY
		BEGIN TRANSACTION;
							
		BEGIN TRY
			INSERT INTO dbo.Products
        (
        ProductId,
        ProductMarking
        )
    VALUES
        (
            @Fin_ProductId,
            @Marking
				)
		END TRY
	
		BEGIN CATCH
			UPDATE dbo.Products
				SET dbo.Products.ProductMarking=@Marking					
				WHERE dbo.Products.ProductId=@Fin_ProductId
		END CATCH
						
		BEGIN TRY
			INSERT INTO dbo.Batchs
        (
        BatchName,
        BatchDate,
        Plant
        )
    VALUES
        (
            @BatchName,
            @BatchDate,
            @Plant					
				)
		END TRY
	
		BEGIN CATCH
			UPDATE dbo.Batchs
				SET dbo.Batchs.BatchDate=@BatchDate,
					dbo.Batchs.Plant=@Plant					
				WHERE dbo.Batchs.BatchName=@BatchName			
		END CATCH
		SELECT
        (SELECT BatchPK
        FROM dbo.Batchs b
        WHERE b.BatchName=@BatchName) AS batchpk,
        RIGHT('000000'+cast(FieldItem.N.value('./productid[1]', 'varchar(6)') as varchar),6) as productid,
        FieldItem.N.value('./productname[1]', 'varchar(200)') as productname,
        -- FieldItem.N.value('./dim[1]', 'varchar(50)') as dim,
        FieldItem.N.value('./quantity[1]', 'varchar(50)') as quantity
    INTO 
		#BoilsSummary
    FROM
        @documentXml.nodes('/document/batch_record/row') as FieldItem(N) 

		INSERT INTO dbo.Products
        (
        ProductId,
        ProductName
        )
    SELECT DISTINCT productId,
        productname
    FROM #BoilsSummary
    WHERE NOT EXISTS(SELECT 1
    FROM dbo.Products
    WHERE 
						dbo.Products.ProductId=#BoilsSummary.productId
						)
	
	
		UPDATE dbo.Products
			SET dbo.Products.ProductName=b.productname
		FROM dbo.Products p
        JOIN #BoilsSummary b
        ON p.ProductId=b.productid
			   		 
		begin try	   		 	  			   		 	  	  
		DELETE FROM dbo.BtProducts
		WHERE dbo.BtProducts.BatchPK=(
			SELECT BatchPK
    FROM dbo.Batchs b
    WHERE b.BatchName=@BatchName
			)
		end try
		begin catch
		set @result=33
		end catch
		
		INSERT INTO dbo.BtProducts
        (
        BatchPK,
        ProductId
        )
    VALUES
        (
            (SELECT BatchPK
            FROM dbo.Batchs b
            WHERE b.BatchName=@BatchName),
            @Fin_ProductId
			)
		
		DELETE FROM dbo.Boils
		WHERE dbo.Boils.BatchPK=(
			SELECT BatchPK
    FROM dbo.Batchs b
    WHERE b.BatchName=@BatchName
			)
		
		INSERT INTO dbo.Boils
        (BatchPK, ProductId, Quantity)
    SELECT batchpk,
        productid,
        quantity
    FROM #BoilsSummary
			SET @result=1
		
		IF @@TRANCOUNT>0
			COMMIT;
	END TRY

	BEGIN CATCH
		IF @@TRANCOUNT>0
			ROLLBACK;
		SET @result=22	
		  DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        -- Re-raise the error
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
	END CATCH

    IF OBJECT_ID('tempdb.dbo.#BoilsSummary', 'U') IS NOT NULL
		DROP TABLE #BoilsSummary;

    SELECT @result
END
GO





