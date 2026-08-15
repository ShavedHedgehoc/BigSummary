import { Injectable } from '@nestjs/common';
import History from 'src/models/histories.model';
import HistoryType from 'src/models/history_types.model';
import { AddHistoryDto } from './dto/add-histories.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class HistoriesService {
  constructor(
    @InjectModel(History)
    private historiesService: typeof History,
  ) {}

  async findLastHistorybyRecordId(record_id: number) {
    const lastHistory = await this.historiesService.findOne({
      where: {
        record_id: record_id,
      },
      include: { model: HistoryType, as: 'historyType' },
      order: [['id', 'DESC']],
    });
    return lastHistory;
  }

  async createHistory(dto: AddHistoryDto) {
    await this.historiesService.create(dto);
  }
}
