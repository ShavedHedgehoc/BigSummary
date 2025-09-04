import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetConveyorTasksDto } from './dto/get-conveyor-tasks.dto';

@Injectable()
export class ConveyorTasksService {
  constructor(private prisma: PrismaService) {}
  getTasks(conveyor: string) {
    var offset = 3;
    const date = new Date(new Date().getTime() + offset * 3600 * 1000).setHours(
      12,
      0,
      0,
      0,
    );
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
    return records;
  }
}
