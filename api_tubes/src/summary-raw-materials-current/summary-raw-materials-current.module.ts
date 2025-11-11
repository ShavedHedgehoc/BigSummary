import { Module } from "@nestjs/common";
import { SummaryRawMaterialsCurrentService } from "./summary-raw-materials-current.service";
import { SummaryRawMaterialsCurrentController } from "./summary-raw-materials-current.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [SummaryRawMaterialsCurrentService],
  controllers: [SummaryRawMaterialsCurrentController],
})
export class SummaryRawMaterialsCurrentModule {}
