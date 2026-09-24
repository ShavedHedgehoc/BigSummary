import { Injectable } from '@nestjs/common';
import { IApplicationPlantService } from '@repo/trpc';
import { TApplicationPlantListResponse } from '@repo/schemas';
import { pgPrisma } from '@repo/db-postgres';

@Injectable()
export class ApplicationPlantService implements IApplicationPlantService {
  async getPlantList(): Promise<TApplicationPlantListResponse> {
    const plants = await pgPrisma.plants.findMany({});
    return plants;
  }
}
