import { Injectable } from '@nestjs/common';
import { pgPrisma } from '@repo/db-postgres';
import { TGetPlantByValueInput, TPlantByValueOutput } from '@repo/schemas';

@Injectable()
export class PlantCommonService {
  async getPlantByValue(input: TGetPlantByValueInput): Promise<TPlantByValueOutput> {
    const { value } = input;
    const plant = await pgPrisma.plants.findFirst({
      where: { value },
    });
    if (!plant) return null;
    return plant;
  }
}
