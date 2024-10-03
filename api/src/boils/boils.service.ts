import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Boil from "./boil.model";
import { Op } from "sequelize";

@Injectable()
export class BoilsService {
  constructor(
    @InjectModel(Boil)
    private boilsRepository: typeof Boil
  ) {}

  async getAllBoils() {
    const boils = await this.boilsRepository.findAll({ where: { base_id: { [Op.ne]: null } } });
    return boils;
  }

  async getById(id: number) {
    const boil = await this.boilsRepository.findByPk(id);
    return boil;
  }

  async getBoilListRow(id: number) {
    const boil = await this.boilsRepository.findOne({ where: { id: id } });
    return boil;
  }

  async getOrCreateByValue(value: string) {
    if (value === "-" || !value) {
      return null;
    }
    const [boil, _] = await this.boilsRepository.findOrCreate({ where: { value: value } });
    return boil;
  }

  async getByValue(value: string) {
    if (value === "-" || !value) {
      return null;
    }
    const boil = await this.boilsRepository.findOne({ where: { value: value } });
    return boil;
  }
}
