import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConveyorTasksService {
  constructor(private prisma: PrismaService) {}
  async getTasks(conveyor: string) {
    var offset = 3;
    const date = new Date(new Date().getTime() + offset * 3600 * 1000).setHours(12, 0, 0, 0);
    const records = this.prisma.records.findMany({
      include: {
        docs: true,
        conveyors: true,
        products: true,
        boils: true,
      },
      where: {
        docs: { date: new Date(date) },
        conveyors: { value: conveyor },
      },
    });

    const recordsResult = await Promise.all(
      (await records).map(async (item) => {
        const state = await this.prisma.histories.findFirst({
          where: { record_id: item.id },
          orderBy: { id: 'desc' },
          include: {
            history_types: true,
          },
        });
        return {
          record_id: item.id,
          conveyor_name: item.conveyors?.value,
          code_1C: item.products?.code1C,
          marking: item.products?.marking,
          boil_value: item.boils?.value,
          plan: item.plan,
          state: state ? state.history_types?.value : null,
          state_description: state ? state.history_types?.description : null,
        };
      }),
    );

    return recordsResult;
  }

  async getTasksByBarcode(barcode: string) {
    var offset = 3;
    const date = new Date(new Date().getTime() + offset * 3600 * 1000).setHours(12, 0, 0, 0);
    const records = this.prisma.records.findMany({
      include: {
        docs: true,
        conveyors: true,
        products: true,
        boils: true,
      },
      where: {
        docs: { date: new Date(date) },
        conveyors: { barcode: barcode },
      },
    });

    const recordsResult = await Promise.all(
      (await records).map(async (item) => {
        const state = await this.prisma.histories.findFirst({
          where: { record_id: item.id },
          orderBy: { id: 'desc' },
          include: {
            history_types: true,
          },
        });
        return {
          record_id: item.id,
          conveyor_name: item.conveyors?.value,
          code_1C: item.products?.code1C,
          marking: item.products?.marking,
          boil_value: item.boils?.value,
          plan: item.plan,
          state: state ? state.history_types?.value : null,
          state_description: state ? state.history_types?.description : null,
        };
      }),
    );

    return recordsResult;
  }
}
