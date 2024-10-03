import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HistoriesService } from "src/histories/histories.service";
import { RecordsService } from "src/records/records.service";

@Injectable()
export class RecordDetailService {
  constructor(
    private recordsService: RecordsService,
    private historiesService: HistoriesService
  ) {}
  async getRecordDetail(id: number) {
    const record = await this.recordsService.getByIdWitDetailsNew(id);
    if (!record) {
      throw new HttpException("Запись в сводке не найдена", HttpStatus.NOT_FOUND);
    }
    const recordResult = {
      id: record.id,
      date: record.doc.date,
      plant: record.doc.plants.value,
      product: record.product.marking,
      boil: record.boil ? record.boil.value : null,
      conveyor: record.conveyor.value,
    };
    const histories = await this.historiesService.getAllHistoriesByRecIdAndBoilId(id, record.boilId);
    const result = {
      ...JSON.parse(JSON.stringify(recordResult)),
      histories: histories,
    };
    return result;
  }
}
