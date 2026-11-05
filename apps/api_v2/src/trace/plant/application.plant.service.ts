import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { IApplicationTracePlantService } from '@repo/trpc';
import { TTracePlantListResponse } from '@repo/schemas';
import { TracePlantCommonService } from './plant.common.service';

@Injectable()
export class ApplicationTracePlantService implements IApplicationTracePlantService {
  constructor(
    @Inject(forwardRef(() => TracePlantCommonService))
    private tracePlantCommonService: TracePlantCommonService,
  ) {}

  async getAllPlants(): Promise<TTracePlantListResponse> {
    return this.tracePlantCommonService.getAllPlants();
  }
}
