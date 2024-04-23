import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Workshop from "./workshop.model";
import { CreateWorkshopDto } from "./dto/create-workshop.dto";

@Injectable()
export class WorkshopsService {
  constructor(
    @InjectModel(Workshop)
    private workshopsRepository: typeof Workshop
  ) {}

  async getAllWorkshops() {
    const workshops = await this.workshopsRepository.findAll();
    return workshops;
  }

  async getOrCreateByValue(value: string) {
    const [workshops, _] = await this.workshopsRepository.findOrCreate({ where: { value: value } });
    return workshops;
  }

  async createWorkshop(dto: CreateWorkshopDto) {
    const workshops = await this.workshopsRepository.create(dto);
    return workshops;
  }
}
