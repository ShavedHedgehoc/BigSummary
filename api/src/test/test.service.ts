import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HistoriesService } from "src/histories/histories.service";
import { RecordsService } from "src/records/records.service";

@Injectable()
export class TestService {
  constructor(
    private recordsService: RecordsService,
    private historiesService: HistoriesService
  ) {}
  async getRecordDetail(id: number) {
    const record = await this.recordsService.getByIdWitDetailsNew(id);
    if (record) {
      const histories = await this.historiesService.getAllHistoriesByRecIdAndBoilId(id, record.boilId);
      const result = {
        ...JSON.parse(JSON.stringify(record)),
        histories: histories,
      };

      return result;
    }
    throw new HttpException("Запись в сводке не найдена", HttpStatus.NOT_FOUND);
  }
}
