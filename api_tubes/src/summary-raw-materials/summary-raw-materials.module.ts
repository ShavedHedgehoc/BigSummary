import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { SummaryRawMaterialsController } from "./summary-raw-materials.controller";
import { SummaryRawMaterialsService } from "./summary-raw-materials.service";

@Module({
  imports: [PrismaModule],
  controllers: [SummaryRawMaterialsController],
  providers: [SummaryRawMaterialsService],
})
export class SummaryRawMaterialsModule {}
