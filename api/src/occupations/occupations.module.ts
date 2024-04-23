import { Module } from "@nestjs/common";
import { OccupationsService } from "./occupations.service";
import { OccupationsController } from "./occupations.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import Occupation from "./occupations.model";

@Module({
  providers: [OccupationsService],
  controllers: [OccupationsController],
  imports: [SequelizeModule.forFeature([Occupation])],
  exports: [OccupationsService],
})
export class OccupationsModule {}
