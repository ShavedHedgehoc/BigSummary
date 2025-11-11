import { Injectable } from "@nestjs/common";
// import { get_tresholds } from 'generated/prisma/sql';
import { PrismaService } from "src/prisma/prisma.service";
import CreateExtrusionHardwareParamsRecordDto from "./dto/create-extrusion-hardware-params-record.dto";

@Injectable()
export class ExtrusionService {
  constructor(private prisma: PrismaService) {}

  async getExtrusionHardwareTresholdsByProductionId(production_id: number) {
    const extrusionHardwareTresholdsRecord = await this.prisma.extrusionHardwareTresholdsRecord.findFirst({
      where: {
        production_id: production_id,
      },
      include: {
        rondel_type: true,
      },
    });
    return extrusionHardwareTresholdsRecord;
  }

  async createExtrusionHardwareParamsRecord(dto: CreateExtrusionHardwareParamsRecordDto) {
    const extrusionHardwareParamsRecord = await this.prisma.extrusionHardwareParamsRecord.create({
      data: { ...dto },
    });
    return extrusionHardwareParamsRecord;
  }

  async getExtrusionHardwareCurrentParamsBySummaryId(summary_id: number) {
    const extrusionHardwareCurrentParams = await this.prisma.extrusionHardwareParamsRecord.findFirst({
      where: {
        summary_id: summary_id,
      },
      orderBy: { createdAt: "desc" },
      include: {
        rondel_type: true,
      },
    });
    return extrusionHardwareCurrentParams;
  }
}
