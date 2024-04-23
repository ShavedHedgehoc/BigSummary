import { Module } from "@nestjs/common";
import { HistoriesController } from "./histories.controller";
import { HistoriesService } from "./histories.service";
import { SequelizeModule } from "@nestjs/sequelize";
import History from "./histories.model";
import { HistoryTypesModule } from "src/history_types/hystory_types.module";
import { RecordsModule } from "src/records/records.module";

@Module({
  controllers: [HistoriesController],
  providers: [HistoriesService],
  imports: [SequelizeModule.forFeature([History]), HistoryTypesModule, RecordsModule],
  exports: [HistoriesService],
})
export class HistoriesModule {}
