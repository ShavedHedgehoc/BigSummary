import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SummariesService {
  constructor(private prisma: PrismaService) {}

  getActiveSummaryRecordByConveyorId(conveyor_id: number) {
    return this.prisma.summary.findFirst({
      where: {
        conveyor_id: conveyor_id,
        isActive: true,
      },
      include: {
        batch: true,
        production: true,
      },
    });
  }
}
