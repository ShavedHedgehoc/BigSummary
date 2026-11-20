import { Injectable } from '@nestjs/common';
import { pgPrisma, Prisma } from '@repo/db-postgres';
import {
  TApplicationCreateEmployeeInput,
  TApplicationCreateEmployeeResponse,
  TApplicationDeleteEmployeeInput,
  TApplicationDeleteEmployeeResponse,
  TApplicationEmployeeItem,
  TApplicationEmployeeListResponse,
  TApplicationUpdateEmployeeInput,
  TApplicationUpdateEmployeeResponse,
  TGetApplicationEmployeeListInput,
} from '@repo/schemas';
import { IApplicationEmployeeService } from '@repo/trpc';
import { TRPCError } from '@trpc/server';

@Injectable()
export class ApplicationEmployeeService implements IApplicationEmployeeService {
  async getEmployeeList(
    input: TGetApplicationEmployeeListInput,
  ): Promise<TApplicationEmployeeListResponse> {
    const { name, occupations, limit = 10, page = 1, nameAsc = true } = input;

    const safeLimit = Math.max(1, limit);
    const safePage = Math.max(1, page);

    const numericOccupations = occupations
      ? occupations.map(Number).filter((val) => !isNaN(val))
      : [];

    const where: Prisma.employeesWhereInput = {};

    if (name !== '') {
      where.name = { contains: name, mode: 'insensitive' };
    }

    if (numericOccupations && numericOccupations.length > 0) {
      where.occupationId = { in: numericOccupations };
    }

    const [total, employees] = await Promise.all([
      pgPrisma.employees.count({ where }),
      pgPrisma.employees.findMany({
        where,
        include: {
          occupations: true,
          _count: {
            select: { histories: true },
          },
        },
        orderBy: { name: nameAsc ? 'asc' : 'desc' },
        take: safeLimit,
        skip: safeLimit * (safePage - 1),
      }),
    ]);

    const formattedEmployees: TApplicationEmployeeItem[] = employees.map((e) => {
      return {
        id: e.id,
        name: e.name,
        barcode: e.barcode,
        occupation: e.occupations,
        isCanDelete: e._count.histories === 0,
      };
    });
    const totalPages = Math.ceil(total / limit);

    return { rows: formattedEmployees, total, totalPages };
  }

  async updateEmployee(
    input: TApplicationUpdateEmployeeInput,
  ): Promise<TApplicationUpdateEmployeeResponse> {
    const { id, ...data } = input;
    const existsEmployee = await pgPrisma.employees.findUnique({ where: { id } });
    if (!existsEmployee) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Сотрудник не найден',
      });
    }
    const normalizedBarcode = data.barcode?.trim() || null;

    if (normalizedBarcode && normalizedBarcode !== existsEmployee.barcode) {
      const barcodeTaken = await pgPrisma.employees.findUnique({
        where: { barcode: normalizedBarcode },
      });

      if (barcodeTaken) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Штрихкод уже используется',
        });
      }
    }
    const rawOccupationId = data.occupation?.occupationId;
    const occupationId =
      rawOccupationId !== undefined && rawOccupationId !== null
        ? Number(rawOccupationId)
        : undefined;

    try {
      const updatedEmployee = await pgPrisma.employees.update({
        where: { id },
        data: {
          ...(data.name !== undefined && { name: data.name.trim() }),
          ...(data.barcode !== undefined && { barcode: normalizedBarcode }),
          ...(occupationId !== undefined &&
            !Number.isNaN(occupationId) && {
              occupationId,
            }),
        },
      });

      return { id: updatedEmployee.id, success: true };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Штрихкод уже используется',
        });
      }
      throw error;
    }
  }

  async createEmployee(
    input: TApplicationCreateEmployeeInput,
  ): Promise<TApplicationCreateEmployeeResponse> {
    const normalizedBarcode = input.barcode.trim();

    if (normalizedBarcode) {
      const barcodeTaken = await pgPrisma.employees.findUnique({
        where: { barcode: normalizedBarcode },
      });

      if (barcodeTaken) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Штрихкод уже используется',
        });
      }
    }
    const rawOccupationId = input.occupation?.occupationId;
    const occupationId =
      rawOccupationId !== undefined && rawOccupationId !== null
        ? Number(rawOccupationId)
        : undefined;

    try {
      const employee = await pgPrisma.employees.create({
        data: {
          name: input.name.trim(),
          barcode: normalizedBarcode,
          ...(occupationId !== undefined &&
            !Number.isNaN(occupationId) && {
              occupationId,
            }),
        },
      });

      return employee;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Штрихкод уже используется',
        });
      }
      throw error;
    }
  }

  async deleteEmployee(
    input: TApplicationDeleteEmployeeInput,
  ): Promise<TApplicationDeleteEmployeeResponse> {
    const { id } = input;
    const hasHistory = await pgPrisma.histories.findFirst({
      where: { employeeId: id },
      select: { id: true },
    });
    if (hasHistory) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'У сотрудника найдены записи в истории. Удаление невозможно!',
      });
    }
    try {
      await pgPrisma.employees.delete({
        where: { id },
      });
      return { id, success: true };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Сотрудник не найден',
        });
      }
      throw error;
    }
  }
}
