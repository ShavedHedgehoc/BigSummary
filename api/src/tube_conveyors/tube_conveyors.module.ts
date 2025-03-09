import { Module } from "@nestjs/common";
import { TubeConveyorsService } from "./tube_conveyors.service";
import { SequelizeModule } from "@nestjs/sequelize";
import TubeConveyor from "./tube_conveyors.model";

@Module({
  providers: [TubeConveyorsService],
  imports: [SequelizeModule.forFeature([TubeConveyor])],
  exports: [TubeConveyorsService],
})
export class TubeConveyorsModule {}
