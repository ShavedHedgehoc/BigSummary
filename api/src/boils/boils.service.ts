import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Boil from "./boil.model";
import { CreateBoilDto } from "./dto/create-boil.dto";

@Injectable()
export class BoilsService {
  constructor(
    @InjectModel(Boil)
    private boilsRepository: typeof Boil
  ) {}

  async getAllBoils() {
    const boils = await this.boilsRepository.findAll();
    return boils;
  }

  async getOrCreateByValue(value: string) {
    const [boils, _] = await this.boilsRepository.findOrCreate({ where: { value: value } });
    return boils;
  }

  async getByValue(value: string) {
    const boil = await this.boilsRepository.findOne({ where: { value: value } });
    return boil;
  }

  async createBoil(dto: CreateBoilDto) {
    const boils = await this.boilsRepository.create(dto);
    return boils;
  }
}
