import { Module } from '@nestjs/common';
import { DashTracePlantService } from './dash.plant.service';
import { TracePlantCommonService } from './plant.common.service';

@Module({
    providers: [DashTracePlantService, TracePlantCommonService],
    exports: [DashTracePlantService],
})
export class TracePlantModule { }
