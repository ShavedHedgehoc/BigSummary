import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SummariesService {
  constructor(private prisma: PrismaService) {}

  async getActiveSummary(conveyor_id: number) {
    const summary = await this.prisma.summary.findFirst({
      where: { conveyor_id: conveyor_id, isActive: true },
    });
    if (!summary) throw new HttpException("Активная сводка не найдена", HttpStatus.NOT_FOUND);
  }

  async getActiveSummaryRecordByConveyorId(conveyor_id: number) {
    const activeRecord = await this.prisma.summary.findFirst({
      where: { conveyor_id: conveyor_id, isActive: true },
      include: {
        batch: true,
        chief_notes: true,
        production: {
          include: {
            extrusion_tresholds: { include: { rondel_type: true } },
          },
        },
        extrusion_params: {
          orderBy: { createdAt: "desc" },
          take: 1,
          include: { rondel_type: true },
        },
      },
    });
    if (!activeRecord) throw new HttpException("Активная сводка не найдена", HttpStatus.NOT_FOUND);
    return activeRecord;
  }

  async getActiveSummaryCountersById(id: number) {
    const summary = await this.prisma.summary.findUnique({
      where: { id: id },
      include: {
        extrusion_params: {
          select: {
            createdAt: true,
            counter_value: true,
          },
        },
      },
    });

    return summary;
  }
}
