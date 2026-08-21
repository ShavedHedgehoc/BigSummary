import { Injectable } from '@nestjs/common';
import { mssqlPrisma } from '@repo/db-mssql';
import { TTracePlantListResponse } from '@repo/schemas';

@Injectable()
export class TracePlantCommonService {
    async getAllPlants(): Promise<TTracePlantListResponse> {
        const plants = await mssqlPrisma.plants.findMany({});
        return plants
    }
}
