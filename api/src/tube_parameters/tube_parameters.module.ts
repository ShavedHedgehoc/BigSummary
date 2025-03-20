import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TubeParametersService } from './tube_parameters.service';
import { TubeParametersController } from './tube_parameters.controller';
import TubeParameter from "./tube_parameters.model";

@Module({
  imports: [SequelizeModule.forFeature([TubeParameter])],
  providers: [TubeParametersService],
  controllers: [TubeParametersController],
})
export class TubeParametersModule {}
