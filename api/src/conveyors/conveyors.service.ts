import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Conveyor from "./conveyor.model";
import { CreateConveyorDto } from "./dto/create-conveyor.dto";

@Injectable()
export class ConveyorsService {
  constructor(
    @InjectModel(Conveyor)
    private conveyorsRepository: typeof Conveyor
  ) {}

  async getAllConveyors() {
    const conveyors = await this.conveyorsRepository.findAll();
    return conveyors;
  }

  async getOrCreateByValue(value: string) {
    const [conveyors, _] = await this.conveyorsRepository.findOrCreate({ where: { value: value } });
    return conveyors;
  }

  async createConveyor(dto: CreateConveyorDto) {
    const conveyors = await this.conveyorsRepository.create(dto);
    return conveyors;
  }
}
