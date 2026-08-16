import { Injectable } from '@nestjs/common';
import { pgPrisma } from '@repo/db-postgres';
import { IWorkstationEmployeeService } from '@repo/trpc';
import { TRPCError } from '@trpc/server'; // 1. Импортируем нативные ошибки tRPC
import {
  TWorkstationEmployeeByBarcodeOutput,
  TGetWorkstationEmployeeByBarcodeInput,
} from '@repo/schemas';

@Injectable()
export class WorkstationEmployeeService implements IWorkstationEmployeeService {
  async getEmployeeByBarcode(
    input: TGetWorkstationEmployeeByBarcodeInput,
  ): Promise<TWorkstationEmployeeByBarcodeOutput> {
    const { barcode } = input;

    const employee = await pgPrisma.employees.findUnique({
      where: { barcode },
      include: { occupations: true },
    });

    if (!employee) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Сотрудник со штрихкодом ${barcode} не найден`,
      });
    }

    return employee;
  }
}
