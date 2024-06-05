import { Module } from "@nestjs/common";
import { HistoriesController } from "./histories.controller";
import { HistoriesService } from "./histories.service";
import { SequelizeModule } from "@nestjs/sequelize";
import History from "./histories.model";
import { HistoryTypesModule } from "src/history_types/hystory_types.module";
import { RecordsModule } from "src/records/records.module";
import { HttpModule } from "@nestjs/axios";
import { UsersModule } from "src/users/users.module";

@Module({
  controllers: [HistoriesController],
  providers: [HistoriesService],
  imports: [SequelizeModule.forFeature([History]), HistoryTypesModule, RecordsModule, HttpModule, UsersModule],
  exports: [HistoriesService],
})
export class HistoriesModule {}
