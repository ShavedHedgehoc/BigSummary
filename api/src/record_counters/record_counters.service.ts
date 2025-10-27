import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import RecordCounter from "./record_counters.model";

@Injectable()
export class RecordCountersService {
  constructor(
    @InjectModel(RecordCounter)
    private recordCounterRepository: typeof RecordCounter
  ) {}

  async getTaskSum(id: number): Promise<number> {
    const result = await this.recordCounterRepository.sum("counter_value", {
      where: { record_id: id },
    });
    return result;
  }
}
