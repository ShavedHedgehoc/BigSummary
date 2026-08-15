import { Module } from "@nestjs/common";
import { TraceCansService } from "./trace_cans.service";
import { TraceCansController } from "./trace_cans.controller";
import TraceCan from "src/v1/trace_models/trace_can.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { TraceCanRecordsModule } from "src/v1/trace_can_records/trace_can_records.module";
import { TraceCanLocationsModule } from "src/v1/trace_can_locations/trace_can_locations.module";

@Module({
  providers: [TraceCansService],
  controllers: [TraceCansController],
  imports: [
    SequelizeModule.forFeature([TraceCan], "trace_connection"),
    TraceCanRecordsModule,
    TraceCanLocationsModule,
  ],
  exports: [TraceCansService],
})
export class TraceCansModule { }
