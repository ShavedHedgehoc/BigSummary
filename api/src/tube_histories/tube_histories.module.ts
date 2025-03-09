import { Module } from "@nestjs/common";
import { TubeHistoriesService } from "./tube_histories.service";
import TubeHistory from "./tube_histories.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  providers: [TubeHistoriesService],
  imports: [SequelizeModule.forFeature([TubeHistory])],
})
export class TubeHistoriesModule {}
