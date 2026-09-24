import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { pgPrisma, Prisma } from '@repo/db-postgres';
import { TCreateHistoryInput, TCreateHistoryResponse } from '@repo/schemas';
import { TRPCError } from '@trpc/server';
import { RecordCommonService } from '../record/record.common.service';
import { prepareBoilData } from 'src/shared';

const historyWithRelationsInclude = {
  history_types: true,
  users: true,
  employees: true,
  notes: true,
} as const;

export type THistoryWithRelations = Prisma.historiesGetPayload<{
  include: typeof historyWithRelationsInclude;
}>;

export type THistoryWithTypeRelations = Prisma.historiesGetPayload<{
  include: {
    history_types: true;
  };
}>;

enum ApiMessages {
  RECORD_NOT_FOUND = 'Запись в сводке не найдена',
  BASE_ALREADY_ON_CHECK = 'Основа уже отнесена на пробу',
  PRODUCT_ALREADY_ON_CHECK = 'Продукт уже отнесен на пробу',
  NEED_EMPTY_OR_FAIL = 'Необходимо отсутствие записей или статус "Брак продукта"',
  NEED_EMPTY_OR_FAIL_OR_CORRECT = 'Необходимо отсутствие записей или статусы "Брак продукта" или "Требуется доработка"',
  NEED_PROGRESS_OR_FAIL_OR_CORRECT = 'Необходимы статусы "Фасуется", "Брак продукта" или "Требуется доработка"',
  NEED_PASS = 'Необходим статус "Допуск на подключение"',
  SECOND_CHECK_FAIL = 'Для повторной пробы необходим статус "Брак основы", "Требуется корректировка" или "Продолжение варки"',
}
type TRPCErrorCode =
  | 'PARSE_ERROR'
  | 'BAD_REQUEST'
  | 'INTERNAL_SERVER_ERROR'
  | 'NOT_IMPLEMENTED'
  | 'BAD_GATEWAY'
  | 'SERVICE_UNAVAILABLE'
  | 'GATEWAY_TIMEOUT'
  | 'UNAUTHORIZED'
  | 'PAYMENT_REQUIRED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'METHOD_NOT_SUPPORTED'
  | 'TIMEOUT'
  | 'CONFLICT'
  | 'PRECONDITION_FAILED'
  | 'PAYLOAD_TOO_LARGE'
  | 'UNSUPPORTED_MEDIA_TYPE'
  | 'UNPROCESSABLE_CONTENT'
  | 'PRECONDITION_REQUIRED'
  | 'TOO_MANY_REQUESTS'
  | 'CLIENT_CLOSED_REQUEST';

type TPrismaCtx = Prisma.TransactionClient | typeof pgPrisma;
@Injectable()
export class HistoryCommonService {
  constructor(
    @Inject(forwardRef(() => RecordCommonService))
    private recordCommonService: RecordCommonService,
  ) {}

  // private async getOrCreateBoilByValue(value: string) {
  //   if (value === '-' || !value) {
  //     return null;
  //   }

  //   const boil = await pgPrisma.boils.upsert({
  //     where: {
  //       value: value,
  //     },
  //     update: {},
  //     create: {
  //       value: value,
  //     },
  //   });
  //   return boil;
  // }
  async getOrCreateBoilByValue(value: string, tx: TPrismaCtx = pgPrisma) {
    if (value === '-' || !value) {
      return null;
    }
    const boilData = prepareBoilData(value);
    const boil = await tx.boils.upsert({
      where: {
        value: value,
      },
      update: {},
      create: {
        value: value,
        year: boilData.year,
        letter: boilData.letter,
        number: boilData.number,
      },
    });

    return boil;
  }

  private async getOrCreateBaseByCode(code: string) {
    if (!code) {
      return null;
    }
    const base = await pgPrisma.bases.upsert({
      where: {
        code: code,
      },
      update: {},
      create: {
        code: code,
      },
    });
    return base;
  }

  private async сreateNoteByValue(value: string | null) {
    if (!value || value === '') {
      return null;
    }
    const note = await pgPrisma.notes.create({ data: { value: value } });
    return note;
  }

  async createNewHistory(input: TCreateHistoryInput): Promise<TCreateHistoryResponse> {
    const {
      historyType,
      note,
      history_note,
      boil_value,
      base_code,
      plant_id,
      record_id,
      employeeId,
      userId,
    } = input;
    const type = await pgPrisma.history_types.findFirst({
      where: {
        value: historyType,
      },
    });
    if (!type) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Тип записи не найден`,
      });
    }
    const isBase =
      ['base_check', 'plug_pass', 'base_fail', 'base_correct', 'base_continue'].indexOf(
        historyType,
      ) !== -1;
    const boil = await this.getOrCreateBoilByValue(boil_value);
    const base = await this.getOrCreateBaseByCode(base_code);

    if (boil && base && plant_id) {
      await pgPrisma.boils.update({
        where: { id: boil.id },
        data: {
          base_id: base.id,
          plant_id: plant_id,
        },
      });
    }

    const rec_id = isBase ? null : record_id;
    const boil_id = isBase ? boil.id : null;

    let note_id: number | null = null;
    if (history_note && history_note.trim() !== '') {
      const historyNote = await this.сreateNoteByValue(history_note);
      note_id = historyNote ? historyNote.id : null;
    }

    const createDto: Prisma.historiesUncheckedCreateInput = {
      record_id: rec_id,
      boil_id: boil_id,
      note_id: note_id,
      note: note,
      historyTypeId: type.id,
      plant_id: plant_id,
      employeeId: employeeId,
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const history = await pgPrisma.histories.create({ data: createDto });
    return history;
  }

  async getHistoriesForRecords(
    records: Array<{ id: number; water_base_id: number | null }>,
    typeIds?: number[],
  ): Promise<Record<number, THistoryWithRelations[]>> {
    const recordIds = records.map((r) => r.id);
    const boilIds = records.map((r) => r.water_base_id).filter((id): id is number => id !== null);
    const hasTypeFilter = typeIds && typeIds.length > 0;

    const allHistories = await pgPrisma.histories.findMany({
      where: {
        AND: [
          {
            OR: [
              { record_id: { in: recordIds } },
              ...(boilIds.length > 0 ? [{ boil_id: { in: boilIds } }] : []),
            ],
          },

          ...(hasTypeFilter ? [{ historyTypeId: { in: typeIds } }] : []),
        ],
      },
      include: historyWithRelationsInclude,
      orderBy: { createdAt: 'asc' },
    });

    const grouped: Record<number, THistoryWithRelations[]> = {};

    for (const record of records) {
      grouped[record.id] = allHistories.filter((history) => {
        const matchRecord = history.record_id === record.id;
        const matchBoil = record.water_base_id !== null && history.boil_id === record.water_base_id;
        return matchRecord || matchBoil;
      });
    }
    return grouped;
  }

  async getAllHistoriesByRecIdAndBoilId(
    recordId: number,
    boilId: number | null,
  ): Promise<THistoryWithRelations[]> {
    const histories = await pgPrisma.histories.findMany({
      where: boilId
        ? { OR: [{ record_id: recordId }, { boil_id: boilId }] }
        : { record_id: recordId },
      include: historyWithRelationsInclude,
      orderBy: { createdAt: 'asc' },
    });
    return histories;
  }

  async getHistoriesByBoilId(boilId: number): Promise<THistoryWithRelations[]> {
    const histories = await pgPrisma.histories.findMany({
      where: { boil_id: boilId },
      include: historyWithRelationsInclude,
      orderBy: { createdAt: 'asc' },
    });
    return histories;
  }

  async getLastHistory(
    boilValue: string | null,
    recordId: number | null,
  ): Promise<THistoryWithTypeRelations> {
    if (boilValue) {
      const boil = await pgPrisma.boils.upsert({
        where: { value: boilValue },
        update: {},
        create: { value: boilValue },
      });
      const history = await pgPrisma.histories.findFirst({
        where: recordId
          ? {
              OR: [{ record_id: recordId }, { boil_id: boil.id }],
            }
          : { boil_id: boil.id },
        orderBy: { createdAt: 'desc' },
        include: {
          history_types: true,
        },
      });
      return history;
    }

    const history = await pgPrisma.histories.findFirst({
      where: { record_id: recordId },
      orderBy: { createdAt: 'desc' },
      include: { history_types: true },
    });
    return history;
  }

  private async makeApiErrorRecord(dto: object, message: string, code: TRPCErrorCode) {
    const jsonDto = JSON.stringify(dto);
    await pgPrisma.api_errors.create({ data: { dto: jsonDto, message } });
    throw new TRPCError({ code, message });
  }

  private async findRecordId(input: TCreateHistoryInput): Promise<number | null | undefined> {
    const { boil_value, code, plant_id, record_id } = input;

    if (boil_value && code) {
      const record = await this.recordCommonService.getCurrentRecordByBoilAndCode(
        boil_value,
        code,
        plant_id,
      );
      return record ? record.id : record_id;
    }
    return record_id;
  }

  private async findBoilValue(input: TCreateHistoryInput): Promise<string | null> {
    const { boil_value, record_id } = input;
    if (!boil_value && record_id) {
      const record = await pgPrisma.records.findUnique({
        where: { id: record_id },
        include: { boils: true },
      });

      if (!record) return null;

      if (record.isSet) {
        return record.boils?.value ?? null;
      } else {
        if (!record.water_base_id) return null;
        const waterBase = await pgPrisma.boils.findUnique({
          where: { id: record.water_base_id },
          select: { value: true },
        });

        return waterBase?.value ?? null;
      }
    }

    return boil_value ?? null;
  }

  async createHistory(input: TCreateHistoryInput): Promise<TCreateHistoryResponse> {
    const { historyType } = input;

    const findedRecordId = await this.findRecordId(input);
    const findedBoilValue = await this.findBoilValue(input);

    const lastHistory = await this.getLastHistory(findedBoilValue, findedRecordId);

    if (historyType === 'base_check') {
      if (lastHistory && lastHistory.history_types.value === 'base_check') {
        await this.makeApiErrorRecord(input, ApiMessages.BASE_ALREADY_ON_CHECK, 'BAD_REQUEST');
      }
      const isValid =
        lastHistory?.history_types.value === 'base_fail' ||
        lastHistory?.history_types.value === 'base_correct' ||
        lastHistory?.history_types.value === 'base_continue';
      if (lastHistory && !isValid) {
        await this.makeApiErrorRecord(input, ApiMessages.SECOND_CHECK_FAIL, 'BAD_REQUEST');
      }
    }

    if (historyType === 'product_check') {
      if (!findedRecordId) {
        await this.makeApiErrorRecord(input, ApiMessages.RECORD_NOT_FOUND, 'NOT_FOUND');
      }
      const record = await pgPrisma.records.findUnique({ where: { id: findedRecordId } });
      if (!record) {
        await this.makeApiErrorRecord(input, ApiMessages.RECORD_NOT_FOUND, 'NOT_FOUND');
        return;
      }

      // Set
      if (record.isSet && lastHistory && lastHistory.history_types.value === 'product_check') {
        await this.makeApiErrorRecord(input, ApiMessages.PRODUCT_ALREADY_ON_CHECK, 'BAD_REQUEST');
      }

      if (
        record.isSet &&
        lastHistory &&
        (lastHistory.history_types.value === 'product_pass' ||
          lastHistory.history_types.value === 'product_in_progress' ||
          lastHistory.history_types.value === 'product_finished')
      ) {
        await this.makeApiErrorRecord(
          input,
          ApiMessages.NEED_EMPTY_OR_FAIL_OR_CORRECT,
          'BAD_REQUEST',
        );
      }

      // Not set
      if (!record.isSet && !lastHistory) {
        await this.makeApiErrorRecord(input, ApiMessages.NEED_PASS, 'BAD_REQUEST');
      }

      if (
        !record.isSet &&
        lastHistory &&
        lastHistory.history_types.value !== 'plug_pass' &&
        lastHistory.history_types.value !== 'product_fail' &&
        lastHistory.history_types.value !== 'product_correct'
      ) {
        if (lastHistory.history_types.value === 'product_in_progress') {
          input = { ...input, note: 'Дополнительная проба' };
        } else if (lastHistory.history_types.value === 'product_check') {
          await this.makeApiErrorRecord(input, ApiMessages.PRODUCT_ALREADY_ON_CHECK, 'BAD_REQUEST');
        } else {
          await this.makeApiErrorRecord(
            input,
            ApiMessages.NEED_PROGRESS_OR_FAIL_OR_CORRECT,
            'BAD_REQUEST',
          );
        }
      }
    }

    const history = await this.createNewHistory({ ...input, record_id: findedRecordId });
    return history;
  }
}
