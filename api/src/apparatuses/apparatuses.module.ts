import { Module } from "@nestjs/common";
import { ApparatusesService } from "./apparatuses.service";
import { ApparatusesController } from "./apparatuses.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import Apparatus from "./apparatuses.model";

@Module({
  providers: [ApparatusesService],
  controllers: [ApparatusesController],
  imports: [SequelizeModule.forFeature([Apparatus])],
  exports: [ApparatusesService],
})
export class ApparatusesModule {}
