import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSummaryRawMaterialCurrentDto } from "./dto/create-summary-raw-materials-current.dto";

import { ApiMessages } from "src/resources/api-messages";
import { GetSummaryRawMaterialCurrentDto } from "./dto/get-summary-raw-materials-current.dto";

@Injectable()
export class SummaryRawMaterialsCurrentService {
  constructor(private prisma: PrismaService) {}

  getCurrentRawMaterialsBySummaryIdAndPostId(dto: GetSummaryRawMaterialCurrentDto) {
    return this.prisma.summaryRawMaterialCurrentRecord.findMany({
      where: {
        summary_id: dto.summary_id,
        raw_material: {
          post_number: dto.post_id,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: { raw_material: true, employee: true },
    });
  }

  async createSummaryRawMaterialsCurrentRecord(dto: CreateSummaryRawMaterialCurrentDto) {
    const raw_material = await this.prisma.summaryRawMaterialRecord.findFirst({
      where: { raw_material: { code: dto.code } },
    });
    if (!raw_material) throw new HttpException(ApiMessages.MATERIAL_NOT_BELONG_TO_CURRENT, HttpStatus.BAD_REQUEST);

    const record = await this.prisma.summaryRawMaterialCurrentRecord.create({
      data: {
        summary_id: dto.summary_id,
        employee_id: dto.employee_id,
        lot: dto.lot,
        raw_material_id: raw_material.id,
      },
    });
    return record;
  }
}
