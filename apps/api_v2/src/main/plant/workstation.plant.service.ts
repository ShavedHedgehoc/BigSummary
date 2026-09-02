import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { IWorkstationPlantService } from '@repo/trpc';
import { TGetPlantByValueInput, TPlantByValueOutput } from '@repo/schemas';
import { PlantCommonService } from './plant.common.service';

@Injectable()
export class WorkstationPlantService implements IWorkstationPlantService {
  constructor(
    @Inject(forwardRef(() => PlantCommonService))
    private plantCommonService: PlantCommonService,
  ) {}
  async getPlantByValue(input: TGetPlantByValueInput): Promise<TPlantByValueOutput> {
    return this.plantCommonService.getPlantByValue(input);
  }
}
