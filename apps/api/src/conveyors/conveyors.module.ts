import { Module } from "@nestjs/common";
import { ConveyorsService } from "./conveyors.service";
import { ConveyorsController } from "./conveyors.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import Conveyor from "./conveyor.model";

@Module({
  providers: [ConveyorsService],
  controllers: [ConveyorsController],
  imports: [SequelizeModule.forFeature([Conveyor])],
  exports: [ConveyorsService],
})
export class ConveyorsModule {}
