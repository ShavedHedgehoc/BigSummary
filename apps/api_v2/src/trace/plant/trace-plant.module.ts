import { Module } from '@nestjs/common';
import { DashTracePlantService } from './dash.plant.service';
import { TracePlantCommonService } from './plant.common.service';
import { ApplicationTracePlantService } from './application.plant.service';

@Module({
  providers: [ApplicationTracePlantService, DashTracePlantService, TracePlantCommonService],
  exports: [ApplicationTracePlantService, DashTracePlantService],
})
export class TracePlantModule {}
