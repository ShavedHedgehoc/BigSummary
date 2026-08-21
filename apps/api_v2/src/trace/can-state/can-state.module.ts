import { Module } from '@nestjs/common';
import { DashTraceCanStateService } from './dash.can-state.service';
import { TraceCanStateCommonService } from './can-state.common.service';

@Module({
    providers: [DashTraceCanStateService, TraceCanStateCommonService],
    exports: [DashTraceCanStateService],
})
export class TraceCanStateModule { }
