import { forwardRef, Inject, Injectable } from '@nestjs/common';

import {
  TApplicationTraceCanDataListResponse,
  TApplicationTraceCanLocationDataListResponse,
  TApplicationTraceCanVolumeListResponse,
  TGetApplicationTraceCanDataListInput,
  TGetTraceCanDataListInput,
} from '@repo/schemas';

import { TraceCanCommonService } from './can.common.service';
import { IApplicationTraceCanService } from '@repo/trpc';

@Injectable()
export class ApplicationTraceCanService implements IApplicationTraceCanService {
  constructor(
    @Inject(forwardRef(() => TraceCanCommonService))
    private traceCanCommonService: TraceCanCommonService,
  ) {}

  async getCanVolumesList(): Promise<TApplicationTraceCanVolumeListResponse> {
    return this.traceCanCommonService.getCanVolumesList();
  }

  async getCanDataList(
    input: TGetApplicationTraceCanDataListInput,
  ): Promise<TApplicationTraceCanDataListResponse> {
    const { plants, states, volumes, ...rest } = input;
    const numericStates = states ? states.map(Number).filter((val) => !isNaN(val)) : [];
    const numericPlants = plants ? plants.map(Number).filter((val) => !isNaN(val)) : [];
    const numericVolumes = volumes ? volumes.map(Number).filter((val) => !isNaN(val)) : [];
    const coercedInput: TGetTraceCanDataListInput = {
      ...rest,
      states: numericStates,
      plants: numericPlants,
      volumes: numericVolumes,
    };
    const result = await this.traceCanCommonService.getCanDataList({
      ...coercedInput,
      includeRecords: true,
    });
    return result;
  }

  async getCanLocationDataList(): Promise<TApplicationTraceCanLocationDataListResponse> {
    const coercedInput: TGetTraceCanDataListInput = {
      states: [],
      plants: [],
      volumes: [],
      can: '',
    };
    const result = await this.traceCanCommonService.getCanDataList({
      ...coercedInput,
      includeRecords: false,
    });
    return result;
  }
}
