import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import HistoryType from 'src/models/history_types.model';

@Injectable()
export class HistoryTypesService {
  constructor(
    @InjectModel(HistoryType)
    private historyTypesService: typeof HistoryType,
  ) {}

  async findHistoryTypeByValue(value: string) {
    const historyType = await this.historyTypesService.findOne({
      where: { value: value },
    });
    return historyType;
  }
}
