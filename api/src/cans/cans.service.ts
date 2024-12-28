import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Can from "./cans.model";

@Injectable()
export class CansService {
  constructor(
    @InjectModel(Can)
    private cansRepository: typeof Can
  ) {}

  async getOrCreateByValue(value: string) {
    if (value === "-" || !value) {
      return null;
    }
    const [cans, _] = await this.cansRepository.findOrCreate({ where: { value: value } });
    return cans;
  }
}
