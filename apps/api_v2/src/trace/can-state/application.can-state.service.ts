import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { IApplicationTraceCanStateService } from '@repo/trpc';
import { TTraceCanStateListResponse } from '@repo/schemas';
import { TraceCanStateCommonService } from './can-state.common.service';

@Injectable()
export class ApplicationTraceCanStateService implements IApplicationTraceCanStateService {
  constructor(
    @Inject(forwardRef(() => TraceCanStateCommonService))
    private traceCanStateCommonService: TraceCanStateCommonService,
  ) {}

  async getAllCanStates(): Promise<TTraceCanStateListResponse> {
    return this.traceCanStateCommonService.getAllStates();
  }
}
