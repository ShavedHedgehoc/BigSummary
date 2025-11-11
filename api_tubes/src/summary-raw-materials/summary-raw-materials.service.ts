import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GetSummaryRawMaterialsBySummaryIdDto } from "./dto/get-summary-raw-materials-by-summary-id-dto";

@Injectable()
export class SummaryRawMaterialsService {
  constructor(private prisma: PrismaService) {}
  getSummaryRawMaterialsBySummaryId(dto: GetSummaryRawMaterialsBySummaryIdDto) {
    return this.prisma.summaryRawMaterialRecord.findMany({
      where: {
        summary_id: dto.summary_id,
        raw_material: {
          post_number: dto.post_id,
        },
      },
      include: {
        raw_material: {
          include: {
            raw_materials_current_records: {
              orderBy: { createdAt: "desc" },
              take: 1,
            },
          },
        },
      },
    });
  }
}
