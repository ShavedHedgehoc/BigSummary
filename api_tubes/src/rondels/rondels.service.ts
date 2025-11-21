import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RondelsService {
  constructor(private prisma: PrismaService) {}
  async getAllRondels() {
    const rondels = await this.prisma.rondel.findMany();
    return { rondels: rondels };
  }
}
