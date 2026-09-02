import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PublicApiCounterCreateDto } from './counters.controller';
import { pgPrisma, Prisma } from '@repo/db-postgres';
import { TPublicApiCreateCounterResponse } from '@repo/schemas';

@Injectable()
export class CountersService {
  async addCounterRecord(dto: PublicApiCounterCreateDto): Promise<TPublicApiCreateCounterResponse> {
    const startHistoryTypeValue = 'product_in_progress';
    const finishHistoryTypeValue = 'product_finished';

    const { record_id, task_uid, counter_value, finished } = dto;

    const existsRecord = await pgPrisma.records.findUnique({ where: { id: record_id } });
    if (!existsRecord) {
      throw new HttpException('Запись не найдена', HttpStatus.BAD_REQUEST);
    }

    const existsTask = await pgPrisma.record_counters.findFirst({ where: { task_uid } });
    if (existsTask && existsTask.record_id !== record_id) {
      throw new HttpException('Задача принадлежит другой записи', HttpStatus.BAD_REQUEST);
    }

    const counter_record = await pgPrisma.record_counters.upsert({
      where: { task_uid: task_uid },
      create: {
        task_uid,
        counter_value,
        record_id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      update: {
        counter_value,
        updatedAt: new Date(),
      },
    });

    const recordState = await pgPrisma.histories.findFirst({
      where: { record_id },
      include: {
        history_types: true,
      },
      orderBy: { id: 'desc' },
    });

    const startHistoryType = await pgPrisma.history_types.findUnique({
      where: { value: startHistoryTypeValue },
    });
    const finishHistoryType = await pgPrisma.history_types.findUnique({
      where: { value: finishHistoryTypeValue },
    });

    const now = new Date();

    if (recordState?.history_types?.value) {
      if (recordState.historyTypeId !== startHistoryType?.id && !finished && startHistoryType?.id) {
        const data: Prisma.historiesUncheckedCreateInput = {
          record_id: record_id,
          historyTypeId: startHistoryType?.id,
          note: 'Информация со счетчика',
          createdAt: now,
          updatedAt: now,
        };
        await pgPrisma.histories.create({ data });
        return counter_record;
      }
    }
    if (recordState?.history_types?.value) {
      if (recordState.historyTypeId === startHistoryType?.id && !finished) {
        return counter_record;
      }
      if (recordState.historyTypeId === finishHistoryType?.id && finished) {
        return counter_record;
      }
    }

    if (recordState?.history_types?.value) {
      if (
        recordState.history_types.value !== 'product_finished' &&
        finished &&
        finishHistoryType?.id
      ) {
        const data: Prisma.historiesUncheckedCreateInput = {
          record_id: record_id,
          historyTypeId: finishHistoryType?.id,
          note: 'Информация со счетчика',
          createdAt: now,
          updatedAt: now,
        };
        await pgPrisma.histories.create({ data });
        return counter_record;
      }
    }

    if (finishHistoryType?.id && startHistoryType?.id) {
      const data: Prisma.historiesUncheckedCreateInput = {
        record_id: record_id,
        historyTypeId: finished ? finishHistoryType?.id : startHistoryType?.id,
        note: 'Информация со счетчика',
        createdAt: now,
        updatedAt: now,
      };
      await pgPrisma.histories.create({ data });
      return counter_record;
    }
    return counter_record;
  }
}
