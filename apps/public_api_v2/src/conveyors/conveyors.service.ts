import { Injectable } from '@nestjs/common';
import { pgPrisma } from '@repo/db-postgres';
import { TPublicApiConveyorListResponse } from '@repo/schemas';

@Injectable()
export class ConveyorsService {
  async findAll(): Promise<TPublicApiConveyorListResponse> {
    const conveyors = await pgPrisma.conveyors.findMany({});
    return conveyors;
  }
}
