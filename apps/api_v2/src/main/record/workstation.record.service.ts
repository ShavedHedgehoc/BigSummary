import { Injectable } from '@nestjs/common';
import { pgPrisma } from '@repo/db-postgres';
import {
  TWorkstationRelatedRecordListInput,
  TWorkstationRelatedRecordListResponse,
} from '@repo/schemas';
import { IWorkstationRecordService } from '@repo/trpc';

@Injectable()
export class WorkstationRecordService implements IWorkstationRecordService {
  async getRelatedRecords(
    input: TWorkstationRelatedRecordListInput,
  ): Promise<TWorkstationRelatedRecordListResponse> {
    const { plantId, boilValue, code } = input;
    const currDate = new Date();
    currDate.setHours(12, 0, 0, 0);
    const records = await pgPrisma.records.findMany({
      where: {
        docs: {
          date: currDate,
          plantId,
        },
        boils: {
          value: boilValue,
        },
        products: {
          code1C: code,
        },
      },
    });
    return records;
  }
}
