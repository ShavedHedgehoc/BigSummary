import { Module } from "@nestjs/common";
import { TraceCanRecordsService } from "./trace_can_records.service";
import { TraceCanRecordsController } from "./trace_can_records.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import TraceCanRecord from "src/trace_models/trace_can_record.model";

@Module({
  providers: [TraceCanRecordsService],
  controllers: [TraceCanRecordsController],
  imports: [SequelizeModule.forFeature([TraceCanRecord], "trace_connection")],
  exports: [TraceCanRecordsService],
})
export class TraceCanRecordsModule {}
