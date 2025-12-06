import { Module } from "@nestjs/common";
import { PrinterService } from "./printer.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { PrinterController } from "./printer.controller";

@Module({
  providers: [PrinterService],
  controllers: [PrinterController],
  imports: [PrismaModule],
})
export class PrinterModule {}
