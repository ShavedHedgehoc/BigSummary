import { Injectable } from '@nestjs/common';
import { mssqlPrisma } from '@repo/db-mssql';
import { TTraceCanStateListResponse } from '@repo/schemas';

@Injectable()
export class TraceCanStateCommonService {
    async getAllStates(): Promise<TTraceCanStateListResponse> {
        const states = await mssqlPrisma.canStates.findMany({});
        return states
    }
}
