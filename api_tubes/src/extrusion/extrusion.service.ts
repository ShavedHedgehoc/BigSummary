import { Injectable } from '@nestjs/common';
import { get_tresholds } from 'generated/prisma/sql';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExtrusionService {
  constructor(private prisma: PrismaService) {}

  async findExtrusionHardwareTresholdsByProductionId(production_id: number) {
    return this.prisma.$queryRawTyped(get_tresholds(production_id));
  }
}
