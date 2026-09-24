import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  IBoilListFilter,
  TApplicationBoilListResponse,
  TGetApplicationLabBoilListInput,
  TGetBoilListInput,
} from '@repo/schemas';
import { IApplicationBoilService } from '@repo/trpc';
import { BoilCommonService } from './boil.common.service';

@Injectable()
export class ApplicationBoilService implements IApplicationBoilService {
  constructor(
    @Inject(forwardRef(() => BoilCommonService))
    private boilCommonService: BoilCommonService,
  ) {}

  async getBoilList(input: TGetApplicationLabBoilListInput): Promise<TApplicationBoilListResponse> {
    const { baseCode, boil, marking, boilAsc, states, plants, limit, page } = input;
    const numericStates = states ? states.map(Number).filter((val) => !isNaN(val)) : [];
    const numericPlants = plants ? plants.map(Number).filter((val) => !isNaN(val)) : [];
    const filter: IBoilListFilter = {
      baseCode,
      boil,
      marking,
      haveRecord: false,
      boilAsc,
      states: numericStates,
      plants: numericPlants,
    };
    const coersedInput: TGetBoilListInput = {
      filter,
      limit,
      page,
    };
    const result = await this.boilCommonService.getBoilList({
      ...coersedInput,
      includeHistories: true,
    });
    return result;
  }
}
