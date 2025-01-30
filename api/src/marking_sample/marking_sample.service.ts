import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import MarkingSample from "./marking_sample.model";

@Injectable()
export class MarkingSampleService {
  constructor(
    @InjectModel(MarkingSample)
    private markingSampleRepository: typeof MarkingSample
  ) {}

  async getOrCreateByValue(value: string) {
    if (value === "-" || !value) {
      return null;
    }
    const [marking_sample, _] = await this.markingSampleRepository.findOrCreate({ where: { value: value } });
    return marking_sample;
  }
}
