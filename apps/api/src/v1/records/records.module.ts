import { Module, forwardRef } from "@nestjs/common";
import { RecordsController } from "./records.controller";
import { RecordsService } from "./records.service";
import { SequelizeModule } from "@nestjs/sequelize";
import Record from "./records.model";
import { SeriesModule } from "src/v1/series/series.module";
import { ProductsModule } from "src/v1/products/products.module";
import { BoilsModule } from "src/v1/boils/boils.module";
import { ApparatusesModule } from "src/v1/apparatuses/apparatuses.module";
import { CansModule } from "src/v1/cans/cans.module";
import { ConveyorsModule } from "src/v1/conveyors/conveyors.module";
import { WorkshopsModule } from "src/v1/workshops/workshops.module";
import { DocsModule } from "src/v1/docs/docs.module";
import { PlantsModule } from "src/v1/plants/plants.module";
import { RecordRegulationsModule } from "src/v1/record_regulations/record_regulations.module";
import { MarkingSampleModule } from "src/v1/marking_sample/marking_sample.module";
import { SemiProductsModule } from "src/v1/semi_products/semi_products.module";

@Module({
  controllers: [RecordsController],
  providers: [RecordsService],
  imports: [
    SequelizeModule.forFeature([Record]),
    SeriesModule,
    ProductsModule,
    BoilsModule,
    ApparatusesModule,
    CansModule,
    ConveyorsModule,
    WorkshopsModule,
    DocsModule,
    PlantsModule,
    RecordRegulationsModule,
    MarkingSampleModule,
    SemiProductsModule,
  ],
  exports: [RecordsService],
})
export class RecordsModule { }
