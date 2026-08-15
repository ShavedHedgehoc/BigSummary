import { Module } from '@nestjs/common';
import { WorkstationConveyorService } from './workstation.conveyor.service';

@Module({
    providers: [WorkstationConveyorService],
    exports: [WorkstationConveyorService],
})
export class ConveyorModule { }