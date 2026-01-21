import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RanksService {
  constructor(private prisma: PrismaService) {}

  async getRanks() {
    const ranks = await this.prisma.rank.findMany();
    return { ranks: ranks };
  }
}
