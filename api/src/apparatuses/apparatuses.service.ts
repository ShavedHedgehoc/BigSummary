import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Apparatus from "./apparatuses.model";
import { CreateApparatusDto } from "./dto/create-apparatus.dto";

@Injectable()
export class ApparatusesService {
  constructor(
    @InjectModel(Apparatus)
    private apparatusRepository: typeof Apparatus
  ) {}

  async getAllApparatuses() {
    const apparatuses = await this.apparatusRepository.findAll();
    return apparatuses;
  }

  async getOrCreateByValue(value: string) {
    const [apparatus, _] = await this.apparatusRepository.findOrCreate({ where: { value: value } });
    return apparatus;
  }

  async createApparatus(dto: CreateApparatusDto) {
    const apparatus = await this.apparatusRepository.create(dto);
    return apparatus;
  }
}
