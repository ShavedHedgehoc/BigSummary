import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import History from "./histories.model";
import { CreateHistoryDto } from "./dto/create-history.dto";
import { HistoryTypesService } from "src/history_types/history_types.service";
import { RecordsService } from "src/records/records.service";

@Injectable()
export class HistoriesService {
  constructor(
    @InjectModel(History)
    private historyRepository: typeof History,
    private historyTypesService: HistoryTypesService,
    private recordsService: RecordsService
  ) {}

  async createHistory(dto: CreateHistoryDto) {
    const historyType = await this.historyTypesService.getByValue(dto.historyType);
    if (historyType) {
      const history = await this.historyRepository.create({ ...dto, historyTypeId: historyType.id });
      return history;
    }
    throw new HttpException("Тип записи не найден", HttpStatus.NOT_FOUND);
  }

  async getAllHistories() {
    const histories = await this.historyRepository.findAll();
    return histories;
  }

  async getLastHistoryByRecId(recordId: number) {
    const record = await this.recordsService.getById(recordId);
    if (record) {
      const history = await this.historyRepository.findAll({
        limit: 1,
        where: { recordId: recordId },
        order: [["createdAt", "DESC"]],
      });
      return history;
    }
    throw new HttpException("Запись в сводке не найдена", HttpStatus.NOT_FOUND);
  }
}
