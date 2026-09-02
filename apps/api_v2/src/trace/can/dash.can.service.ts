import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { IDashTraceCanService } from '@repo/trpc';
import {
  TDashTraceCanDataListResponse,
  TDashTraceCanVolumeListResponse,
  TGetDashTraceCanDataListInput,
} from '@repo/schemas';

import { TraceCanCommonService } from './can.common.service';

@Injectable()
export class DashTraceCanService implements IDashTraceCanService {
  constructor(
    @Inject(forwardRef(() => TraceCanCommonService))
    private traceCanCommonService: TraceCanCommonService,
  ) {}

  async getCanVolumesList(): Promise<TDashTraceCanVolumeListResponse> {
    return this.traceCanCommonService.getCanVolumesList();
  }

  async getCanDataList(
    input: TGetDashTraceCanDataListInput,
  ): Promise<TDashTraceCanDataListResponse> {
    return this.traceCanCommonService.getCanDataList(input);
  }
}
