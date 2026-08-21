import { Module } from '@nestjs/common';
import { DashPlantService } from './dash.plant.service';

@Module({
  providers: [DashPlantService],
  exports: [DashPlantService],
})
export class PlantModule {}
