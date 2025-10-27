import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Boil from 'src/models/boil.model';
import Conveyor from 'src/models/conveyor.model';
import Doc from 'src/models/docs.model';
import Product from 'src/models/products.model';
import Record from 'src/models/records.model';

@Injectable()
export class RecordsService {
  constructor(
    @InjectModel(Record)
    private recordsService: typeof Record,
  ) {}

  async getRecordById(id: number) {
    const record = await this.recordsService.findByPk(id);
    return record;
  }

  async getTodayRecordsByConveyorValue(conveyor_name: string) {
    var offset = 3;
    const date = new Date(new Date().getTime() + offset * 3600 * 1000).setHours(12, 0, 0, 0);
    const records = await this.recordsService.findAll({
      include: [
        { model: Doc, as: 'doc', where: { date: new Date(date) } },
        { model: Conveyor, as: 'conveyor', where: { value: conveyor_name } },
        { model: Product, as: 'product' },
        { model: Boil, as: 'boil' },
      ],
    });
    return records;
  }
  async getTodayRecordsByConveyorBarcode(conveyor_barcode: string) {
    var offset = 3;
    const date = new Date(new Date().getTime() + offset * 3600 * 1000).setHours(12, 0, 0, 0);
    const records = await this.recordsService.findAll({
      include: [
        { model: Doc, as: 'doc', where: { date: new Date(date) } },
        { model: Conveyor, as: 'conveyor', where: { barcode: conveyor_barcode } },
        { model: Product, as: 'product' },
        { model: Boil, as: 'boil' },
      ],
    });
    return records;
  }
}
