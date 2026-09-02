import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { IDashPlantService } from '@repo/trpc';
import { TGetPlantByValueInput, TPlantByValueOutput } from '@repo/schemas';
import { PlantCommonService } from './plant.common.service';

@Injectable()
export class DashPlantService implements IDashPlantService {
  constructor(
    @Inject(forwardRef(() => PlantCommonService))
    private plantCommonService: PlantCommonService,
  ) {}
  async getPlantByValue(input: TGetPlantByValueInput): Promise<TPlantByValueOutput> {
    return this.plantCommonService.getPlantByValue(input);
  }
}
