import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { IDashTraceCanStateService } from '@repo/trpc';
import { TTraceCanStateListResponse } from '@repo/schemas';
import { TraceCanStateCommonService } from './can-state.common.service';

@Injectable()
export class DashTraceCanStateService implements IDashTraceCanStateService {
    constructor(
        @Inject(forwardRef(() => TraceCanStateCommonService))
        private traceCanStateCommonService: TraceCanStateCommonService,
    ) { }

    async getAllCanStates(): Promise<TTraceCanStateListResponse> {
        return this.traceCanStateCommonService.getAllStates()
    }
}
