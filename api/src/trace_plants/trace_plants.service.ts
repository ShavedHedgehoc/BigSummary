import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import TracePlant from "src/trace_models/trace_plant.model";

@Injectable()
export class TracePlantsService {
  constructor(
    @InjectModel(TracePlant, "trace_connection")
    private tracePlantRepository: typeof TracePlant
  ) {}

  async getPlants() {
    const plants = await this.tracePlantRepository.findAll();
    return plants;
  }
}
