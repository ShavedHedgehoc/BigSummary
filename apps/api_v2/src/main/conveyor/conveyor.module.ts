import { Module } from '@nestjs/common';
import { WorkstationConveyorService } from './workstation.conveyor.service';
import { ApplicationConveyorService } from './application.conveyor.service';

@Module({
  providers: [WorkstationConveyorService, ApplicationConveyorService],
  exports: [WorkstationConveyorService, ApplicationConveyorService],
})
export class ConveyorModule {}
