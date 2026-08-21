import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { IDashBoilService } from '@repo/trpc';

import { BoilCommonService } from './boil.common.service';
import { TBoilListResponse, TGetBoilListInput } from '@repo/schemas';

@Injectable()
export class DashBoilService implements IDashBoilService {
  constructor(
    @Inject(forwardRef(() => BoilCommonService))
    private boilCommonService: BoilCommonService,
  ) {}
  async getBoilList(input: TGetBoilListInput): Promise<TBoilListResponse> {
    const result = await this.boilCommonService.getBoilList(input);
    return result;
  }
}
