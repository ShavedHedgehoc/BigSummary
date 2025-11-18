import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RondelTypesService {
  constructor(private prisma: PrismaService) {}

  getAllRondelTypes() {
    return this.prisma.rondelType.findMany();
  }
}
