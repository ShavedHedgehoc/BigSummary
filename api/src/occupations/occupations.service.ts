import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Occupation from "./occupations.model";
import { CreateOccupationDto } from "./dto/create-occupation.dto";

@Injectable()
export class OccupationsService {
  constructor(
    @InjectModel(Occupation)
    private occupationRepository: typeof Occupation
  ) {}

  async createOccupation(dto: CreateOccupationDto) {
    const occupation = await this.occupationRepository.create(dto);
    return occupation;
  }

  async getAllOccupations() {
    const occupations = await this.occupationRepository.findAll();
    return occupations;
  }

  async getOccupationByValue(value: string) {
    const occupation = await this.occupationRepository.findOne({ where: { value: value } });
    return occupation;
  }
}
