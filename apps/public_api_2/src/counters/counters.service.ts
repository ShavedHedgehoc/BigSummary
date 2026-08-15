import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddCounterValueDto } from './dto/add-counter-value.dto';
import axios from 'axios';
import RecordCounter from 'src/models/record-counters.model';

import { HistoriesService } from 'src/histories/histories.service';
import { HistoryTypesService } from 'src/history-types/history-types.service';
import { AddHistoryDto } from 'src/histories/dto/add-histories.dto';
import { ProductsService } from 'src/products/products.service';
import { BoilsService } from 'src/boils/boils.service';
import { RecordsService } from 'src/records/records.service';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CountersService {
  constructor(
    @InjectModel(RecordCounter)
    private countersService: typeof RecordCounter,
    private recordsService: RecordsService,
    private historiesService: HistoriesService,
    private historyTypesService: HistoryTypesService,
    private productsService: ProductsService,
    private boilsService: BoilsService,
  ) {}

  async sendMessages(id: number, state: string) {
    const $record = await this.recordsService.getRecordById(id);
    const $product = $record?.productId ? await this.productsService.getProductById($record.productId) : null;
    const $boil = $record?.boilId ? await this.boilsService.getBoilById($record.boilId) : null;

    if ($record && $product && $boil) {
      const msg = `Данные со счетчика: ${$product.marking} - ${$boil.value} - ${state} `;
      await axios.get(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${process.env.CHAT_ID}&text=${msg}`,
      );
    }
  }

  async findFirstRecordCounterByUID(uid: string) {
    const recordCounter = this.countersService.findOne({ where: { task_uid: uid } });
    return recordCounter;
  }

  async addCounterRecord(dto: AddCounterValueDto) {
    const startHistoryTypeValue = 'product_in_progress';
    const finishHistoryTypeValue = 'product_finished';

    const existsRecord = await this.recordsService.getRecordById(dto.record_id);
    if (!existsRecord) {
      throw new HttpException('Запись не найдена', HttpStatus.BAD_REQUEST);
    }

    const existsTask = await this.findFirstRecordCounterByUID(dto.task_uid);

    if (existsTask && existsTask.record_id !== dto.record_id) {
      throw new HttpException('Задача принадлежит другой записи', HttpStatus.BAD_REQUEST);
    }

    const [counter_record, _] = await this.countersService.upsert({
      record_id: dto.record_id,
      task_uid: dto.task_uid,
      counter_value: dto.counter_value,
    });

    const recordState = await this.historiesService.findLastHistorybyRecordId(dto.record_id);

    const startHistoryType = await this.historyTypesService.findHistoryTypeByValue(startHistoryTypeValue);
    const finishHistoryType = await this.historyTypesService.findHistoryTypeByValue(finishHistoryTypeValue);

    if (recordState?.historyType.value) {
      if (recordState.historyTypeId !== startHistoryType?.id && !dto.finished && startHistoryType?.id) {
        const data: AddHistoryDto = {
          record_id: dto.record_id,
          boil_id: null,
          historyTypeId: startHistoryType?.id,
          userId: null,
          employeeId: null,
          note: 'Информация со счетчика',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await this.historiesService.createHistory(data);
        await this.sendMessages(dto.record_id, 'Фасуется');
        return counter_record;
      }
    }
    if (recordState?.historyType?.value) {
      if (recordState.historyTypeId === startHistoryType?.id && !dto.finished) {
        return counter_record;
      }
      if (recordState.historyTypeId === finishHistoryType?.id && dto.finished) {
        return counter_record;
      }
    }

    if (recordState?.historyType?.value) {
      if (recordState.historyType.value !== 'product_finished' && dto.finished && finishHistoryType?.id) {
        const data: AddHistoryDto = {
          record_id: dto.record_id,
          boil_id: null,
          historyTypeId: finishHistoryType?.id,
          userId: null,
          employeeId: null,
          note: 'Информация со счетчика',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await this.historiesService.createHistory(data);
        await this.sendMessages(dto.record_id, 'Фасовка завершена');
        return counter_record;
      }
    }

    if (finishHistoryType?.id && startHistoryType?.id) {
      const data: AddHistoryDto = {
        record_id: dto.record_id,
        boil_id: null,
        historyTypeId: dto.finished ? finishHistoryType?.id : startHistoryType?.id,
        userId: null,
        employeeId: null,
        note: 'Информация со счетчика',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await this.historiesService.createHistory(data);
      await this.sendMessages(dto.record_id, dto.finished ? 'Фасовка завершена' : 'Фасуется');
      return counter_record;
    }
  }
}
