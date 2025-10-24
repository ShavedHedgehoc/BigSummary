import { Injectable } from "@nestjs/common";
// import { get_tresholds } from 'generated/prisma/sql';
import { PrismaService } from "src/prisma/prisma.service";
import CreateExtrusionHardwareParamsRecordDto from "./dto/create-extrusion-hardware-params-record.dto";

@Injectable()
export class ExtrusionService {
  constructor(private prisma: PrismaService) {}

  async findExtrusionHardwareTresholdsByProductionId(production_id: number) {
    // return this.prisma.$queryRawTyped(get_tresholds(production_id));
    const extrusionHardwareTresholdsRecord = await this.prisma.extrusionHardwareTresholdsRecord.findFirst({
      where: {
        production_id: production_id,
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
}
