import { Module } from "@nestjs/common";
import { BoilsListService } from "./boils.list.service";
import { BoilsListController } from "./boils.list.controller";
import { BoilsModule } from "src/boils/boils.module";
import { RecordsModule } from "src/records/records.module";
import { HistoriesModule } from "src/histories/histories.module";
import { BasesModule } from "src/bases/bases.module";
import { PlantsModule } from "src/plants/plants.module";

@Module({
  providers: [BoilsListService],
  controllers: [BoilsListController],
  imports: [BoilsModule, RecordsModule, HistoriesModule, BasesModule, PlantsModule],
})
export class BoilsListModule {}
