import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PrinterService {
  constructor(private prisma: PrismaService) {}

  async getPrinter(conveyor_id: number) {
    const ip = await this.prisma.printer.findUnique({ where: { conveyor_id: conveyor_id } });
    return ip;
  }
}
