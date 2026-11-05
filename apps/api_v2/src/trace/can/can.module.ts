import { Module } from '@nestjs/common';
import { DashTraceCanService } from './dash.can.service';
import { TraceCanCommonService } from './can.common.service';
import { ApplicationTraceCanService } from './application.can.service';

@Module({
  providers: [ApplicationTraceCanService, DashTraceCanService, TraceCanCommonService],
  exports: [ApplicationTraceCanService, DashTraceCanService],
})
export class TraceCanModule {}
