import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import TubeHistoryType from "./tube_history_types.model";

@Injectable()
export class TubeHistoryTypesService {
  constructor(
    @InjectModel(TubeHistoryType)
    private tubeHistoryTypesRepository: typeof TubeHistoryType
  ) {}

  async getHistoryTypeByValue(value: string) {
    const historyType = await this.tubeHistoryTypesRepository.findOne({ where: { value: value } });
    return historyType;
  }
}
