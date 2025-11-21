import { Module } from "@nestjs/common";
import { RondelsService } from "./rondels.service";
import { RondelsController } from "./rondels.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  providers: [RondelsService],
  controllers: [RondelsController],
  imports: [PrismaModule],
})
export class RondelsModule {}
