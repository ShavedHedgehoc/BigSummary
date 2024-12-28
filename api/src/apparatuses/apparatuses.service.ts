import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Apparatus from "./apparatuses.model";

@Injectable()
export class ApparatusesService {
  constructor(
    @InjectModel(Apparatus)
    private apparatusRepository: typeof Apparatus
  ) {}

  async getOrCreateByValue(value: string) {
    if (value === "-" || !value) {
      return null;
    }
    const [apparatus, _] = await this.apparatusRepository.findOrCreate({ where: { value: value } });
    return apparatus;
  }
}
