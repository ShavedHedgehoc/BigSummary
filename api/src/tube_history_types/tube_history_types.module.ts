import { Module } from "@nestjs/common";
import { TubeHistoryTypesService } from "./tube_history_types.service";
import TubeHistoryType from "./tube_history_types.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  providers: [TubeHistoryTypesService],
  imports: [SequelizeModule.forFeature([TubeHistoryType])],
  exports: [TubeHistoryTypesService],
})
export class TubeHistoryTypesModule {}
