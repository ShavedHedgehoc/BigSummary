import { Module } from "@nestjs/common";
import { PlantsService } from "./plants.service";
import { PlantsController } from "./plants.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import Plant from "./plant.model";

@Module({
  providers: [PlantsService],
  controllers: [PlantsController],
  imports: [SequelizeModule.forFeature([Plant])],
  exports: [PlantsService],
})
export class PlantsModule {}
