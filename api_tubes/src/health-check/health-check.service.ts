import { Injectable } from "@nestjs/common";
import { health_check } from "generated/prisma/sql";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class HealthCheckService {
  constructor(private prisma: PrismaService) {}
  async checkHeath() {
    return this.prisma.$queryRawTyped(health_check());
  }
}
