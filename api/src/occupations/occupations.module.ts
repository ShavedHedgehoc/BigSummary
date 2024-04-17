import { Module } from "@nestjs/common";
import { OccupationsService } from "./occupations.service";
import { OccupationsController } from "./occupations.controller";

import { SequelizeModule } from "@nestjs/sequelize";
import Occupation from "./occupations.model";
import Worker from "src/workers/workers.model";

@Module({
  providers: [OccupationsService],
  controllers: [OccupationsController],
  imports: [SequelizeModule.forFeature([Occupation, Worker])],
})
export class OccupationsModule {}
