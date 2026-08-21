import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { IDashDocService } from '@repo/trpc';
import { TRPCError } from '@trpc/server';
import {
  TDocDetailResponse,
  TRecordDetailResponse,
  TGetDashDocDataCurentInput,
  TGetDashDocDataCurentAppInput,
  TGetDashDocRowInput,
} from '@repo/schemas';
import { DocCommonService } from './doc.common.service';

@Injectable()
export class DashDocService implements IDashDocService {
  constructor(
    @Inject(forwardRef(() => DocCommonService))
    private docCommonService: DocCommonService,
  ) {}
  async getDocDataCurrent(input: TGetDashDocDataCurentInput): Promise<TDocDetailResponse> {
    const doc = await this.docCommonService.getCurrentDocByPlantId(input.plantId);
    if (!doc) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Документ не найден`,
      });
    }
    const result = await this.docCommonService.getDocDetailData(doc);
    return result;
  }

  async getDocDataCurrentApp(input: TGetDashDocDataCurentAppInput): Promise<TDocDetailResponse> {
    const doc = input.current
      ? await this.docCommonService.getCurrentDocByPlantId(input.plantId)
      : await this.docCommonService.getTomorrowDocByPlantId(input.plantId);
    if (!doc) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Документ не найден`,
      });
    }
    const result = await this.docCommonService.getDocDetailData(doc);
    return result;
  }

  async getDocRecord(input: TGetDashDocRowInput): Promise<TRecordDetailResponse> {
    const { recordId } = input;
    const result = await this.docCommonService.getDocDetailRow(recordId);
    return result;
  }
}
