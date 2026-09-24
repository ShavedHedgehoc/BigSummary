import { Injectable } from '@nestjs/common';
import { pgPrisma } from '@repo/db-postgres';

@Injectable()
export class RecordCounterService {
  async getTaskSum(id: number): Promise<number> {
    const result = await pgPrisma.record_counters.aggregate({
      _sum: {
        counter_value: true,
      },
      where: {
        record_id: id,
      },
    });
    return result._sum.counter_value;
  }

  async getTaskSumsForRecordIds(ids: number[]): Promise<Record<number, number>> {
    if (!ids || ids.length === 0) return {};
    const aggregations = await pgPrisma.record_counters.groupBy({
      by: ['record_id'],
      _sum: {
        counter_value: true,
      },
      where: {
        record_id: {
          in: ids,
        },
      },
    });

    const sumsMap: Record<number, number> = {};

    for (const item of aggregations) {
      sumsMap[item.record_id] = item._sum.counter_value ?? 0;
    }
    return sumsMap;
  }
}
