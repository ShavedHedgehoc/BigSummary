import { Injectable } from '@nestjs/common';
import { pgPrisma, Prisma } from '@repo/db-postgres';
import {
  TGetApplicationConveyorListInput,
  TApplicationConveyorListResponse,
  TApplicationUpdateConveyorInput,
  TApplicationUpdateConveyorResponse,
  TApplicationDeleteConveyorInput,
  TApplicationDeleteConveyorResponse,
  TApplicationConveyorItem,
  BARCODE_MODES,
  HAVE_RECORDS_MODES,
} from '@repo/schemas';
import { IApplicationConveyorService } from '@repo/trpc';
import { TRPCError } from '@trpc/server';

@Injectable()
export class ApplicationConveyorService implements IApplicationConveyorService {
  async getConveyorList(
    input: TGetApplicationConveyorListInput,
  ): Promise<TApplicationConveyorListResponse> {
    const { value, barcodes, records, limit = 10, page = 1 } = input;

    const where: Prisma.conveyorsWhereInput = {};

    if (value !== '') {
      where.value = { contains: value, mode: 'insensitive' };
    }

    if (barcodes && Array.isArray(barcodes) && barcodes.length > 0) {
      if (barcodes.includes(BARCODE_MODES.FILLED)) {
        where.barcode = {
          not: null,
        };
      }

      if (barcodes.includes(BARCODE_MODES.EMPTY)) {
        where.barcode = null;
      }
    }

    if (records && Array.isArray(records) && records.length > 0) {
      if (records.includes(HAVE_RECORDS_MODES.WITH_RECORDS)) {
        where.records = { some: {} };
      }
      if (records.includes(HAVE_RECORDS_MODES.WITHOUT_RECORDS)) {
        where.records = { none: {} };
      }
    }

    const conveyors = await pgPrisma.conveyors.findMany({
      where,
      include: {
        records: {
          select: {
            conveyorId: true,
          },
          take: 1,
        },
      },
    });

    conveyors.sort((a, b) => a.value.localeCompare(b.value, undefined, { numeric: true }));

    const total = conveyors.length;
    const totalPages = Math.ceil(total / limit);
    const offset = limit * (page - 1);
    const paginatedConveyors = conveyors.slice(offset, offset + limit);

    const formattedConveyors: TApplicationConveyorItem[] = paginatedConveyors.map((conveyor) => ({
      id: conveyor.id,
      value: conveyor.value,
      barcode: conveyor.barcode,
      haveRecord: conveyor.records?.length > 0,
    }));

    return { rows: formattedConveyors, total, totalPages };
  }

  async updateConveyor(
    input: TApplicationUpdateConveyorInput,
  ): Promise<TApplicationUpdateConveyorResponse> {
    const { id, ...data } = input;
    const existsConveyor = await pgPrisma.conveyors.findUnique({ where: { id } });
    if (!existsConveyor) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Конвейер не найден',
      });
    }
    if (data.value && data.value !== existsConveyor.value) {
      const valueTaken = await pgPrisma.conveyors.findUnique({
        where: { value: data.value },
      });
      if (valueTaken) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Имя уже используется',
        });
      }
    }
    if (data.barcode && data.barcode !== existsConveyor.barcode) {
      const barcodeTaken = await pgPrisma.conveyors.findFirst({
        where: { barcode: data.barcode },
      });
      if (barcodeTaken) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Штрихкод уже используется',
        });
      }
    }
    if (data.barcode && data.barcode.length !== 13) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Некорректный формат штрихкода',
      });
    }
    const updatedConveyor = await pgPrisma.conveyors.update({
      where: { id },
      data: {
        value: data.value,
        barcode: data.barcode,
      },
    });

    return { id: updatedConveyor.id, success: true };
  }

  async deleteConveyor(
    input: TApplicationDeleteConveyorInput,
  ): Promise<TApplicationDeleteConveyorResponse> {
    const { id } = input;
    const hasRecords = await pgPrisma.records.findFirst({
      where: { conveyorId: id },
      select: { id: true },
    });
    if (hasRecords) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Ссылки на конвейер присутствуют в сводках. Удаление невозможно!',
      });
    }
    try {
      await pgPrisma.conveyors.delete({
        where: { id },
      });
      return { id, success: true };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Конвейер не найден',
        });
      }
      throw error;
    }
  }
}
