import { Module } from "@nestjs/common";
import { PlantsService } from "./plants.service";
import { PlantsController } from "./plants.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import Plant from "./plant.model";
import { SeederModule } from "nestjs-sequelize-seeder";
import { SeedPlant } from "src/seeds/plant.seed";

@Module({
  providers: [PlantsService],
  controllers: [PlantsController],
  imports: [SequelizeModule.forFeature([Plant]), SeederModule.forFeature([SeedPlant])],
  exports: [PlantsService],
})
export class PlantsModule {}
