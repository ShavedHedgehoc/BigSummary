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
import { TraceCanModule } from '../trace/can/can.module';
import { TraceCanRecordModule } from '../trace/can-record/can-record.module';
import { HealthModule } from '../health/health.module';
import { HistoryModule } from '../main/history/history.module';
import { RecordModule } from '../main/record/record.module';
import { AuthModule } from '../auth/auth.module';
import { HistoryTypeModule } from '../main/history-type/history-type.module';
import { UserModule } from '../main/user/user.module';
import { RoleModule } from '../main/role/role.module';

@Module({
  imports: [
    AuthModule,
    HealthModule,
    EmployeeModule,
    HistoryModule,
    HistoryTypeModule,
    ConveyorModule,
    PlantModule,
    DocModule,
    BoilModule,
    RecordModule,
    RoleModule,
    UserModule,
    TracePlantModule,
    TraceCanModule,
    TraceCanStateModule,
    TraceCanRecordModule,
  ],
  providers: [
    {
      provide: 'TRPC_SERVICE',
      useClass: TrpcService,
    },
  ],
  controllers: [TrpcController],
})
export class TrpcModule {}
