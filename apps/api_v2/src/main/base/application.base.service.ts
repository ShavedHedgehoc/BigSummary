import { Injectable } from '@nestjs/common';
import { pgPrisma } from '@repo/db-postgres';
import { TApplicationUpdateBaseInput, TApplicationUpdateBaseResponse } from '@repo/schemas';
import { IApplicationBaseService } from '@repo/trpc';
import { TRPCError } from '@trpc/server';

@Injectable()
export class ApplicationBaseService implements IApplicationBaseService {
  async bulkUpdateBases(
    input: TApplicationUpdateBaseInput,
  ): Promise<TApplicationUpdateBaseResponse> {
    const { rows } = input;
    if (rows.length === 0) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Массив основ пуст!',
      });
    }

    await pgPrisma.$transaction(
      input.rows.map((row) =>
        pgPrisma.bases.updateMany({
          where: { code: row.code },
          data: { marking: row.marking },
        }),
      ),
    );

    return { success: true };
  }
}
