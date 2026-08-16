import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcController } from './trpc.controller';
import { EmployeeModule } from '../employee/employee.module';
import { ConveyorModule } from '../conveyor/conveyor.module';
import { PlantModule } from '../plant/plant.module';

@Module({
  imports: [EmployeeModule, ConveyorModule, PlantModule],
  providers: [
    {
      provide: 'TRPC_SERVICE',
      useClass: TrpcService,
    },
  ],
  controllers: [TrpcController],
})
export class TrpcModule {}
