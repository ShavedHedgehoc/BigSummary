import { Module, forwardRef } from "@nestjs/common";
import { RecordsController } from "./records.controller";
import { RecordsService } from "./records.service";
import { SequelizeModule } from "@nestjs/sequelize";
import Record from "./records.model";
import { SeriesModule } from "src/series/series.module";
import { ProductsModule } from "src/products/products.module";
import { BoilsModule } from "src/boils/boils.module";
import { ApparatusesModule } from "src/apparatuses/apparatuses.module";
import { CansModule } from "src/cans/cans.module";
import { ConveyorsModule } from "src/conveyors/conveyors.module";
import { WorkshopsModule } from "src/workshops/workshops.module";
import { DocsModule } from "src/docs/docs.module";
import { PlantsModule } from "src/plants/plants.module";
import { RecordRegulationsModule } from "src/record_regulations/record_regulations.module";
import { MarkingSampleModule } from "src/marking_sample/marking_sample.module";
import { SemiProductsModule } from "src/semi_products/semi_products.module";

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
export class RecordsModule {}
