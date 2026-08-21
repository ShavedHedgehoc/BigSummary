import { Injectable } from '@nestjs/common';
import { pgPrisma } from '@repo/db-postgres';
import { IDashPlantService } from '@repo/trpc';
import { TRPCError } from '@trpc/server';
import { TGetDashPlantByValueInput, TDashPlantByValueOutput } from '@repo/schemas';

@Injectable()
export class DashPlantService implements IDashPlantService {
  async getPlantByValue(input: TGetDashPlantByValueInput): Promise<TDashPlantByValueOutput> {
    const { value } = input;

    const plant = await pgPrisma.plants.findFirst({
      where: { value },
    });

    if (!plant) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Площадка  ${value} не найдена`,
      });
    }

    return plant;
  }
}
