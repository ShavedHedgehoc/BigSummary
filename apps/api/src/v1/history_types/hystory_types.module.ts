import { Module } from "@nestjs/common";
import { HistoryTypesController } from "./history_types.controller";
import { HistoryTypesService } from "./history_types.service";
import { SequelizeModule } from "@nestjs/sequelize";
import HistoryType from "./history_types.model";
// import { SeederModule } from "nestjs-sequelize-seeder";
// import { SeedHistoryType } from "src/seeds/historyTypes.seed";

@Module({
  controllers: [HistoryTypesController],
  providers: [HistoryTypesService],
  imports: [
    SequelizeModule.forFeature([HistoryType]),
    // SeederModule.forFeature([SeedHistoryType])
  ],
  exports: [HistoryTypesService],
})
export class HistoryTypesModule {}
