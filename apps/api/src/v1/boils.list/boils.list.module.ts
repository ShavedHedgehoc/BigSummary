import { Module } from "@nestjs/common";
import { BoilsListService } from "./boils.list.service";
import { BoilsListController } from "./boils.list.controller";
import { BoilsModule } from "src/v1/boils/boils.module";
import { RecordsModule } from "src/v1/records/records.module";
import { HistoriesModule } from "src/v1/histories/histories.module";
import { BasesModule } from "src/v1/bases/bases.module";
import { PlantsModule } from "src/v1/plants/plants.module";

@Module({
  providers: [BoilsListService],
  controllers: [BoilsListController],
  imports: [
    BoilsModule,
    RecordsModule,
    HistoriesModule,
    BasesModule,
    PlantsModule,
  ],
})
export class BoilsListModule { }
