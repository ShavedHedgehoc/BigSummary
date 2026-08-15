import { Module } from "@nestjs/common";
import { SeriesController } from "./series.controller";
import { SeriesService } from "./series.service";
import { SequelizeModule } from "@nestjs/sequelize";
import Serie from "./series.model";

@Module({
  controllers: [SeriesController],
  providers: [SeriesService],
  imports: [SequelizeModule.forFeature([Serie])],
  exports: [SeriesService],
})
export class SeriesModule {}
