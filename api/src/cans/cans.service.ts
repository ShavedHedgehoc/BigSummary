import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Can from "./cans.model";
import { CreateCanDto } from "./dto/create-can.dto";

@Injectable()
export class CansService {
  constructor(
    @InjectModel(Can)
    private cansRepository: typeof Can
  ) {}

  async getAllCans() {
    const cans = await this.cansRepository.findAll();
    return cans;
  }

  async getOrCreateByValue(value: string) {
    const [cans, _] = await this.cansRepository.findOrCreate({ where: { value: value } });
    return cans;
  }

  async createCan(dto: CreateCanDto) {
    const cans = await this.cansRepository.create(dto);
    return cans;
  }
}
