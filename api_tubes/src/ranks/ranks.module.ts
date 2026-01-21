import { Module } from "@nestjs/common";
import { RanksService } from "./ranks.service";
import { RanksController } from "./ranks.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  providers: [RanksService],
  controllers: [RanksController],
  imports: [PrismaModule],
})
export class RanksModule {}
