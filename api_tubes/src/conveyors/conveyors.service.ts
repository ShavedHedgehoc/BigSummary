import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ConveyorsService {
  constructor(private prisma: PrismaService) {}
  async getConveyorByName(name: string) {
    return this.prisma.conveyor.findUnique({ where: { name: name } });
  }
}
