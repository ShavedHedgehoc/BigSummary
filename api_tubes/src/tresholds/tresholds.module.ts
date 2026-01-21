import { Module } from "@nestjs/common";
import { TresholdsService } from "./tresholds.service";
import { TresholdsController } from "./tresholds.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  providers: [TresholdsService],
  controllers: [TresholdsController],
  imports: [PrismaModule],
})
export class TresholdsModule {}
