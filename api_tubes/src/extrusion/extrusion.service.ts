import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateExtrusionEntryDto } from "./dto/create-extrusion-entry.dto";
import { ApiMessages } from "src/resources/api-messages";

@Injectable()
export class ExtrusionService {
  constructor(private prisma: PrismaService) {}

  async createExtrusionParamsEntry(dto: CreateExtrusionEntryDto) {
    const lastEntry = await this.prisma.extrusionParam.findFirst({
      where: { summary_id: dto.summary_id },
      orderBy: { createdAt: "desc" },
    });
    console.log(lastEntry?.id, lastEntry?.createdAt, lastEntry?.counter_value);
    if (lastEntry && lastEntry.counter_value > dto.counter_value)
      throw new HttpException(ApiMessages.COUNTER_LESS_THEN_LAST_VALUE, HttpStatus.BAD_REQUEST);
    const extrusionHardwareParamsRecord = await this.prisma.extrusionParam.create({
      data: { ...dto },
    });
    return extrusionHardwareParamsRecord;
  }

  // async getExtrusionHardwareTresholdsByProductionId(production_id: number) {
  //   const extrusionHardwareTresholdsRecord = await this.prisma.extrusionHardwareTresholdsRecord.findFirst({
  //     where: { production_id: production_id },
  //     include: { rondel_type: true },
  //   });
  //   return extrusionHardwareTresholdsRecord;
  // }

  // async createExtrusionHardwareParamsRecord(dto: CreateExtrusionHardwareParamsRecordDto) {
  //   const extrusionHardwareParamsRecord = await this.prisma.extrusionHardwareParamsRecord.create({
  //     data: { ...dto },
  //   });
  //   return extrusionHardwareParamsRecord;
  // }

  // async getExtrusionHardwareCurrentParamsBySummaryId(summary_id: number) {
  //   const extrusionHardwareCurrentParams = await this.prisma.extrusionHardwareParamsRecord.findFirst({
  //     where: { summary_id: summary_id },
  //     orderBy: { createdAt: "desc" },
  //     include: { rondel_type: true },
  //   });
  //   return extrusionHardwareCurrentParams;
  // }

  // async getExtrusionAllHardwareParamsBySummaryId(summary_id: number) {
  //   const extrusionHardwareParams = await this.prisma.extrusionHardwareParamsRecord.findMany({
  //     where: { summary_id: summary_id },
  //     orderBy: { createdAt: "desc" },
  //     include: {
  //       rondel_type: true,
  //       employee: true,
  //     },
  //   });
  //   return extrusionHardwareParams;
  // }

  // async getExtrusionQualityControlTresholdsByProductionId(production_id: number) {
  //   const extrusionQualityControlTresholdsRecord = await this.prisma.extrusionQualityControlTresholdsRecord.findFirst({
  //     where: { production_id: production_id },
  //   });
  //   return extrusionQualityControlTresholdsRecord;
  // }
  // async createExtrusionQualityControlParamsRecord(dto: CreateExtrusionQualityControlParamsRecordDto) {
  //   const extrusionQualityControlParamsRecord = await this.prisma.extrusionQualityControlParamsRecord.create({
  //     data: { ...dto },
  //   });
  //   return extrusionQualityControlParamsRecord;
  // }

  // async getExtrusionQualityControlCurrentParamsBySummaryId(summary_id: number) {
  //   const extrusionQualityControlCurrentParams = await this.prisma.extrusionQualityControlParamsRecord.findFirst({
  //     where: { summary_id: summary_id },
  //     orderBy: { createdAt: "desc" },
  //   });
  //   return extrusionQualityControlCurrentParams;
  // }

  // async getExtrusionAllQualityControlParamsBySummaryId(summary_id: number) {
  //   const extrusionQualityControlParams = await this.prisma.extrusionQualityControlParamsRecord.findMany({
  //     where: { summary_id: summary_id },
  //     orderBy: { createdAt: "desc" },
  //     include: { laboratory_assistant: true },
  //     take: 10,
  //   });
  //   return extrusionQualityControlParams;
  // }
}
