import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import TubeParameter from "./tube_parameters.model";

@Injectable()
export class TubeParametersService {
  constructor(
    @InjectModel(TubeParameter)
    private tubeParameterRepository: typeof TubeParameter
  ) {}
  async getTubeParameterByRecId(record_id: number) {
    console.log(record_id);
    const tubeParameter = await this.tubeParameterRepository.findOne({ where: { tube_record_id: record_id } });
    return tubeParameter;
  }
}
