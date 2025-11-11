import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ChiefTechnologistNotesService {
  constructor(private prisma: PrismaService) {}
  getNoteBySummaryId(id: number) {
    return this.prisma.chiefTechnologistNote.findFirst({ where: { summary_id: id } });
  }
}
