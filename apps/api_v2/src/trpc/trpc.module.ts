import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcController } from './trpc.controller';
import { EmployeeModule } from '../main/employee/employee.module';
import { ConveyorModule } from '../main/conveyor/conveyor.module';
import { PlantModule } from '../main/plant/plant.module';
import { DocModule } from '../main/doc/doc.module';
import { BoilModule } from '../main/boil/boil.module';
import { TracePlantModule } from '../trace/plant/trace-plant.module';
import { TraceCanStateModule } from '../trace/can-state/can-state.module';

@Module({
  imports: [EmployeeModule, ConveyorModule, PlantModule, DocModule, BoilModule, TracePlantModule, TraceCanStateModule],
  providers: [
    {
      provide: 'TRPC_SERVICE',
      useClass: TrpcService,
    },
  ],
  controllers: [TrpcController],
})
export class TrpcModule { }
