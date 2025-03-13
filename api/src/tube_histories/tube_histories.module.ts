import { Module } from "@nestjs/common";
import { TubeHistoriesService } from "./tube_histories.service";
import TubeHistory from "./tube_histories.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { TubeHistoriesController } from "./tube_histories.controller";
import { TubeHistoryTypesModule } from "src/tube_history_types/tube_history_types.module";

@Module({
  providers: [TubeHistoriesService],
  imports: [SequelizeModule.forFeature([TubeHistory]), TubeHistoryTypesModule],
  controllers: [TubeHistoriesController],
  exports: [TubeHistoriesService],
})
export class TubeHistoriesModule {}
