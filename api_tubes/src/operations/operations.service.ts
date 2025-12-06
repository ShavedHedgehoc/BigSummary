import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class OperationsService {
  constructor(private prisma: PrismaService) {}

  async getExtrusionOperations({ rank, id }: { rank: string | undefined; id: string | undefined }) {
    let filter = {};
    if (rank) {
      filter = { ...filter, min_rank: { lte: Number(rank) } };
    }
    if (id) {
      filter = { ...filter, id: Number(id) };
    }
    const operations = await this.prisma.extrusionOperation.findMany({
      where: { ...filter },
      orderBy: { id: "asc" },
    });
    return operations;
  }

  async getVarnishOperations({ rank, id }: { rank: string | undefined; id: string | undefined }) {
    let filter = {};
    if (rank) {
      filter = { ...filter, min_rank: { lte: Number(rank) } };
    }
    if (id) {
      filter = { ...filter, id: Number(id) };
    }
    const operations = await this.prisma.varnishOperation.findMany({
      where: { ...filter },
      orderBy: { id: "asc" },
    });
    return operations;
  }

  async getOffsetOperations({ rank, id }: { rank: string | undefined; id: string | undefined }) {
    let filter = {};
    if (rank) {
      filter = { ...filter, min_rank: { lte: Number(rank) } };
    }
    if (id) {
      filter = { ...filter, id: Number(id) };
    }
    const operations = await this.prisma.offsetOperation.findMany({
      where: { ...filter },
      orderBy: { id: "asc" },
    });
    return operations;
  }

  async getSealantOperations({ rank, id }: { rank: string | undefined; id: string | undefined }) {
    let filter = {};
    if (rank) {
      filter = { ...filter, min_rank: { lte: Number(rank) } };
    }
    if (id) {
      filter = { ...filter, id: Number(id) };
    }
    const operations = await this.prisma.sealantOperation.findMany({
      where: { ...filter },
      orderBy: { id: "asc" },
    });
    return operations;
  }
}
