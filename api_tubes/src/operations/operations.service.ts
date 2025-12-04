import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class OperationsService {
  constructor(private prisma: PrismaService) {}

  async getExtrusionOperations(rank: number | undefined) {
    if (!rank) return [];
    const operations = await this.prisma.extrusionOperation.findMany({
      where: { min_rank: { lte: rank } },
      orderBy: { id: "asc" },
    });
    return operations;
  }

  async getVarnishOperations(rank: number | undefined) {
    if (!rank) return [];
    const operations = await this.prisma.varnishOperation.findMany({
      where: { min_rank: { lte: rank } },
      orderBy: { id: "asc" },
    });
    return operations;
  }

  async getOffsetOperations(rank: number | undefined) {
    if (!rank) return [];
    const operations = await this.prisma.offsetOperation.findMany({
      where: { min_rank: { lte: rank } },
      orderBy: { id: "asc" },
    });
    return operations;
  }

  async getSealantOperations(rank: number | undefined) {
    if (!rank) return [];
    const operations = await this.prisma.sealantOperation.findMany({
      where: { min_rank: { lte: rank } },
      orderBy: { id: "asc" },
    });
    return operations;
  }
}
