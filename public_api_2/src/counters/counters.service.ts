import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AddCounterValueDto } from './dto/add-counter-value.dto';
import axios from 'axios';

@Injectable()
export class CountersService {
  constructor(private prisma: PrismaService) {}

  async sendMessages(id: number, state: string) {
    const $record = await this.prisma.records.findFirst({ where: { id: id } });
    const $product = $record?.productId
      ? await this.prisma.products.findFirst({
          where: { id: $record.productId },
        })
      : null;
    const $boil = $record?.boilId
      ? await this.prisma.boils.findFirst({ where: { id: $record.boilId } })
      : null;

    if ($record && $product && $boil) {
      const msg = `Данные со счетчика: ${$product.marking} - ${$boil.value} - ${state} `;
      await axios.get(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${process.env.CHAT_ID}&text=${msg}`,
      );
    }
  }

  async addCounterRecord(dto: AddCounterValueDto) {
    const existsRecord = await this.prisma.records.findFirst({
      where: {
        id: dto.record_id,
      },
    });
    if (!existsRecord) {
      throw new HttpException('Запись не найдена', HttpStatus.BAD_REQUEST);
    }

    const existsTask = await this.prisma.record_counters.findFirst({
      where: { task_uid: dto.task_uid },
    });

    if (existsTask && existsTask.record_id !== dto.record_id) {
      throw new HttpException(
        'Задача принадлежить другой записи',
        HttpStatus.BAD_REQUEST,
      );
    }
    const counter_record = await this.prisma.record_counters.upsert({
      where: {
        task_uid: dto.task_uid,
        record_id: dto.record_id,
      },
      create: {
        record_id: dto.record_id,
        task_uid: dto.task_uid,
        counter_value: dto.counter_value,
      },
      update: {
        counter_value: dto.counter_value,
      },
    });

    const recordState = await this.prisma.histories.findFirst({
      where: {
        record_id: dto.record_id,
      },
      include: {
        history_types: true,
      },
      orderBy: { id: 'desc' },
    });
    const startHistoryType = await this.prisma.history_types.findUnique({
      where: {
        value: 'product_in_progress',
      },
    });
    const finishHistoryType = await this.prisma.history_types.findUnique({
      where: {
        value: 'product_finished',
      },
    });

    if (recordState?.history_types?.value) {
      if (recordState.historyTypeId !== startHistoryType?.id && !dto.finished) {
        await this.prisma.histories.create({
          data: {
            record_id: dto.record_id,
            boil_id: null,
            historyTypeId: startHistoryType?.id,
            userId: null,
            employeeId: null,
            note: 'Информация со счетчика',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        await this.sendMessages(dto.record_id, 'Фасуется');
        return counter_record;
      }
    }
    if (recordState?.history_types?.value) {
      if (recordState.historyTypeId === startHistoryType?.id && !dto.finished) {
        return counter_record;
      }
      if (recordState.historyTypeId === finishHistoryType?.id && dto.finished) {
        return counter_record;
      }
    }

    if (recordState?.history_types?.value) {
      if (
        recordState.history_types.value !== 'product_finished' &&
        dto.finished
      ) {
        await this.prisma.histories.create({
          data: {
            record_id: dto.record_id,
            boil_id: null,
            historyTypeId: finishHistoryType?.id,
            userId: null,
            employeeId: null,
            note: 'Информация со счетчика',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        await this.sendMessages(dto.record_id, 'Фасовка завершена');
        return counter_record;
      }
    }

    await this.prisma.histories.create({
      data: {
        record_id: dto.record_id,
        boil_id: null,
        historyTypeId: dto.finished
          ? finishHistoryType?.id
          : startHistoryType?.id,
        userId: null,
        employeeId: null,
        note: 'Информация со счетчика',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    await this.sendMessages(
      dto.record_id,
      dto.finished ? 'Фасовка завершена' : 'Фасуется',
    );
    return counter_record;
  }
}
