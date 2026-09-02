import { Module } from '@nestjs/common';
import { DashPlantService } from './dash.plant.service';
import { WorkstationPlantService } from './workstation.plant.service';
import { PlantCommonService } from './plant.common.service';

@Module({
  exports: [DashPlantService, WorkstationPlantService],
  providers: [DashPlantService, WorkstationPlantService, PlantCommonService],
})
export class PlantModule {}
