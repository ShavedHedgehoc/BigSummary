import { Injectable } from '@nestjs/common';
import { pgPrisma } from '@repo/db-postgres';
import { IWorkstationEmployeeService } from '@repo/trpc';
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
    return employee;
  }
}
