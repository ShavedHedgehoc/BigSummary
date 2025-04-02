import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import TubeParameter from "./tube_parameters.model";
import { CreateTubeParameterDto } from "./dto/create-tube parameter.dto";

@Injectable()
export class TubeParametersService {
  constructor(
    @InjectModel(TubeParameter)
    private tubeParameterRepository: typeof TubeParameter
  ) {}

  async getTubeParameterByRecId(record_id: number) {
    const tubeParameter = await this.tubeParameterRepository.findOne({ where: { tube_record_id: record_id } });
    return tubeParameter;
  }

  async createTubeParameters(dto: CreateTubeParameterDto) {
    const tubeParameter = await this.tubeParameterRepository.create({ ...dto });
    return tubeParameter;
  }
}
