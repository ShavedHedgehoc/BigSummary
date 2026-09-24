import { Module } from '@nestjs/common';
import { DashPlantService } from './dash.plant.service';
import { WorkstationPlantService } from './workstation.plant.service';
import { PlantCommonService } from './plant.common.service';
import { ApplicationPlantService } from './application.plant.service';

@Module({
  exports: [ApplicationPlantService, DashPlantService, WorkstationPlantService],
  providers: [
    ApplicationPlantService,
    DashPlantService,
    WorkstationPlantService,
    PlantCommonService,
  ],
})
export class PlantModule {}
