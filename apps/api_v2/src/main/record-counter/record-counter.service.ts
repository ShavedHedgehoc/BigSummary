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
}
