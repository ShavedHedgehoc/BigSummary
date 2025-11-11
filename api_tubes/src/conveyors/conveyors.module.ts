import { Module } from "@nestjs/common";
import { ConveyorsService } from "./conveyors.service";
import { ConveyorsController } from "./conveyors.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [ConveyorsService],
  controllers: [ConveyorsController],
})
export class ConveyorsModule {}
