import { Module } from '@nestjs/common';
import { DashTraceCanService } from './dash.can.service';
import { TraceCanCommonService } from './can.common.service';

@Module({
  providers: [DashTraceCanService, TraceCanCommonService],
  exports: [DashTraceCanService],
})
export class TraceCanModule {}
