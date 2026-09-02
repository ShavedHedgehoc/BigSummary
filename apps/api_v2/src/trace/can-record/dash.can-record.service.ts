import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { IDashTraceCanRecordService } from '@repo/trpc';
import { TDashTraceCanRecordListResponse, TGetDashTraceCanRecordListInput } from '@repo/schemas';

import { TraceCanRecordCommonService } from './can-record.common.service';

@Injectable()
export class DashTraceCanRecordService implements IDashTraceCanRecordService {
  constructor(
    @Inject(forwardRef(() => TraceCanRecordCommonService))
    private traceCanRecordCommonService: TraceCanRecordCommonService,
  ) {}

  async getLastCanRecordListByCanId(
    input: TGetDashTraceCanRecordListInput,
  ): Promise<TDashTraceCanRecordListResponse> {
    return this.traceCanRecordCommonService.getLastCanRecordListByCanId(input);
  }
}
