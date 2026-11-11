import { Module } from '@nestjs/common';
import { DashTraceCanStateService } from './dash.can-state.service';
import { TraceCanStateCommonService } from './can-state.common.service';
import { ApplicationTraceCanStateService } from './application.can-state.service';

@Module({
  providers: [
    ApplicationTraceCanStateService,
    DashTraceCanStateService,
    TraceCanStateCommonService,
  ],
  exports: [ApplicationTraceCanStateService, DashTraceCanStateService],
})
export class TraceCanStateModule {}
