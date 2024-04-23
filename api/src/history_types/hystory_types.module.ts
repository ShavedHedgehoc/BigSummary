import { Module } from "@nestjs/common";
import { HistoryTypesController } from "./history_types.controller";
import { HistoryTypesService } from "./history_types.service";
import { SequelizeModule } from "@nestjs/sequelize";
import HistoryType from "./history_types.model";

@Module({
  controllers: [HistoryTypesController],
  providers: [HistoryTypesService],
  imports: [SequelizeModule.forFeature([HistoryType])],
  exports: [HistoryTypesService],
})
export class HistoryTypesModule {}
