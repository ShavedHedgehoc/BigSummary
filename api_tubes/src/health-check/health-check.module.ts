import { Module } from "@nestjs/common";

import { HealthCheckService } from "./health-check.service";
import { HealthCheckController } from "./health-check.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [HealthCheckService],
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
