import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Plant from "./plant.model";
import { CreatePlantDto } from "./dto/create-plant.dto";

@Injectable()
export class PlantsService {
  constructor(
    @InjectModel(Plant)
    private plantRepository: typeof Plant
  ) {}

  async getAllPlants() {
    const plants = await this.plantRepository.findAll();
    return plants;
  }

  async getPlantByPk(id: number) {
    const plants = await this.plantRepository.findByPk(id);
    return plants;
  }

  async getPlantByValue(value: string) {
    const plant = await this.plantRepository.findOne({ where: { value: value } });
    return plant;
  }

  async createPlant(dto: CreatePlantDto) {
    const plant = await this.plantRepository.create(dto);
    return plant;
  }
}
