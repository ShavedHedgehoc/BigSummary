import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HistoriesService } from 'src/histories/histories.service';
import Conveyor from 'src/models/conveyor.model';
import { RecordsService } from 'src/records/records.service';

@Injectable()
export class ConveyorsService {
  constructor(
    @InjectModel(Conveyor)
    private conveyorService: typeof Conveyor,
    private recordsService: RecordsService,
    private historiesService: HistoriesService,
  ) {}

  async findAll() {
    const conveyors = await this.conveyorService.findAll();
    return conveyors;
  }

  async getTasks(conveyor: string) {
    const records = this.recordsService.getTodayRecordsByConveyorValue(conveyor);

    const recordsResult = await Promise.all(
      (await records).map(async (item) => {
        const state = await this.historiesService.findLastHistorybyRecordId(item.id);

        return {
          record_id: item.id,
          conveyor_name: item.conveyor?.value,
          code_1C: item.product?.code1C,
          marking: item.product?.marking,
          boil_value: item.boil?.value,
          plan: item.plan,
          state: state ? state.historyType?.value : null,
          state_description: state ? state.historyType?.description : null,
        };
      }),
    );

    return recordsResult;
  }

  async getTasksByBarcode(barcode: string) {
    const records = this.recordsService.getTodayRecordsByConveyorBarcode(barcode);

    const recordsResult = await Promise.all(
      (await records).map(async (item) => {
        const state = await this.historiesService.findLastHistorybyRecordId(item.id);
        return {
          record_id: item.id,
          conveyor_name: item.conveyor?.value,
          code_1C: item.product?.code1C,
          marking: item.product?.marking,
          boil_value: item.boil?.value,
          plan: item.plan,
          state: state ? state.historyType?.value : null,
          state_description: state ? state.historyType?.description : null,
        };
      }),
    );

    return recordsResult;
  }
}
