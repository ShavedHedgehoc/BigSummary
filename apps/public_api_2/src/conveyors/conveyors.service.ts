import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HistoriesService } from 'src/histories/histories.service';
import Conveyor from 'src/models/conveyor.model';
import { RecordsService } from 'src/records/records.service';
import { TaskRow, TasksResponse } from './dto/tasks.response';

@Injectable()
export class ConveyorsService {
  constructor(
    @InjectModel(Conveyor)
    private readonly conveyorService: typeof Conveyor,
    private readonly recordsService: RecordsService,
    private readonly historiesService: HistoriesService,
  ) { }

  async findAll() {
    const conveyors = await this.conveyorService.findAll();
    return conveyors;
  }

  async getTasks({
    conveyor,
    record_id,
    barcode,
    allRecords
  }: {
    conveyor: string | undefined;
    record_id: number | undefined;
    barcode: string | undefined;
    allRecords: boolean | undefined;
  }): Promise<TasksResponse> {
    const records = await this.recordsService.getTodayRecordsByConveyorValue({
      conveyor_name: conveyor,
      record_id: record_id,
      barcode: barcode,
      allRecords: allRecords
    });

    const recordsResult: TasksResponse = await Promise.all(
      records.map(async (item): Promise<TaskRow> => {
        const state = await this.historiesService.findLastHistorybyRecordId(item.id);
        return {
          date: item.doc?.date ?? null,
          record_id: item.id,
          conveyor_name: item.conveyor?.value ?? null,
          code_1C: item.product?.code1C ?? null,
          marking: item.product?.marking ?? null,
          boil_value: item.boil?.value ?? null,
          plan: item.plan,
          state: state?.historyType?.value ?? null,
          state_description: state?.historyType?.description ?? null,
          plant: item.doc?.plants?.value ?? null
        }
      }),
    )

    return recordsResult;
  }
}
