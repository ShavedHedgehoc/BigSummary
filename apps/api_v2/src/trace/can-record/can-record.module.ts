import { Module } from '@nestjs/common';
import { TraceCanRecordCommonService } from './can-record.common.service';
import { DashTraceCanRecordService } from './dash.can-record.service';

@Module({
  providers: [DashTraceCanRecordService, TraceCanRecordCommonService],
  exports: [DashTraceCanRecordService],
})
export class TraceCanRecordModule {}
