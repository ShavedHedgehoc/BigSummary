import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import HistoryType from "./history_types.model";
import { CreateHistoryTypeDto } from "./dto/create-history-type.dto";

@Injectable()
export class HistoryTypesService {
  constructor(
    @InjectModel(HistoryType)
    private historyTypesRepository: typeof HistoryType
  ) {}

  async getAllHistoryTypes() {
    const historyTypes = await this.historyTypesRepository.findAll();
    return historyTypes;
  }

  async getAllBaseHistoryTypes() {
    const historyTypes = await this.historyTypesRepository.findAll({
      where: { for_boil: true },
    });
    return historyTypes;
  }

  async getByValue(value: string) {
    const historyType = await this.historyTypesRepository.findOne({ where: { value: value } });
    return historyType;
  }

  async getById(id: number) {
    const historyType = await this.historyTypesRepository.findByPk(id);
    return historyType;
  }

  async createHistoryType(dto: CreateHistoryTypeDto) {
    const historyType = await this.historyTypesRepository.create(dto);
    return historyType;
  }
}
