import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import TubeConveyor from "./tube_conveyors.model";

@Injectable()
export class TubeConveyorsService {
  constructor(
    @InjectModel(TubeConveyor)
    private tubeConveyorsRepository: typeof TubeConveyor
  ) {}

  async getConveyorByName(conveyor_name: string) {
    const conveyor = await this.tubeConveyorsRepository.findOne({ where: { name: conveyor_name } });
    return conveyor;
  }

  async getOrCreateByName(name: string) {
    const existTubeConveyor = await this.tubeConveyorsRepository.findOne({ where: { name: name } });
    if (existTubeConveyor) {
      return existTubeConveyor;
    }
    const tubeConveyor = await this.tubeConveyorsRepository.create({ name: name });
    return tubeConveyor;
  }
}
