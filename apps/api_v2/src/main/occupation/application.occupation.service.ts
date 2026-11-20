import { Injectable } from '@nestjs/common';
import { IApplicationOccupationService } from '@repo/trpc';
import { TApplicationOccupationListResponse } from '@repo/schemas';
import { pgPrisma } from '@repo/db-postgres';

@Injectable()
export class ApplicationOccupationService implements IApplicationOccupationService {
  async getOccupationList(): Promise<TApplicationOccupationListResponse> {
    const occupations = await pgPrisma.occupations.findMany({});
    return occupations;
  }
}
