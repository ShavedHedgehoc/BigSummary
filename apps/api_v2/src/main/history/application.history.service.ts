import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  TApplicationDeleteHistoryInput,
  TApplicationDeleteHistoryResponse,
  TCreateHistoryInput,
  TCreateHistoryResponse,
} from '@repo/schemas';
import { IApplicationHistoryService } from '@repo/trpc';
import { HistoryCommonService } from './history.common.service';
import { TRPCError } from '@trpc/server';
import { pgPrisma } from '@repo/db-postgres';

@Injectable()
export class ApplicationHistoryService implements IApplicationHistoryService {
  constructor(
    @Inject(forwardRef(() => HistoryCommonService))
    private historyCommonService: HistoryCommonService,
  ) {}

  async directCreateHistory(input: TCreateHistoryInput): Promise<TCreateHistoryResponse> {
    console.log(input);
    const { boil_value, historyType, record_id } = input;
    let boilValue = boil_value === '-' ? null : boil_value;

    const isBaseState =
      historyType === 'base_check' || historyType === 'base_fail' || historyType === 'plug_pass';

    if (!boilValue && isBaseState) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Нет основы, прикрепленной к строке сводки',
      });
    }

    if (isBaseState && record_id && boilValue) {
      const record = await pgPrisma.records.findUnique({
        where: { id: record_id },
        include: {
          water_bases: true,
        },
      });

      if (record && record.water_bases?.value) {
        boilValue = record.water_bases.value;
      }
    }
    return this.historyCommonService.createNewHistory({
      ...input,
      boil_value: boilValue,
    });
  }

  async createHistory(input: TCreateHistoryInput): Promise<TCreateHistoryResponse> {
    return this.historyCommonService.createHistory(input);
  }

  async deleteHistory(
    input: TApplicationDeleteHistoryInput,
  ): Promise<TApplicationDeleteHistoryResponse> {
    const history = await pgPrisma.histories.findUnique({
      where: { id: input.id },
    });
    if (!history) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Запись для удаления не найдена',
      });
    }

    try {
      await pgPrisma.histories.delete({ where: { id: input.id } });
      return { success: true, id: input.id };
    } catch {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Неизвестная ошибка!',
      });
    }
  }
}
