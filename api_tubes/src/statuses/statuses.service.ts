import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateStatusDto } from "./dto/create-status.dto";

@Injectable()
export class StatusesService {
  constructor(private prisma: PrismaService) {}

  async createExtrusionStatus(dto: CreateStatusDto) {
    const extrusionEntry = await this.prisma.extrusionStatus.create({
      data: { ...dto },
    });
    return extrusionEntry;
  }
}
