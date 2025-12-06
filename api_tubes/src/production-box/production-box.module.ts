import { Module } from "@nestjs/common";
import { ProductionBoxService } from "./production-box.service";
import { ProductionBoxController } from "./production-box.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  providers: [ProductionBoxService],
  controllers: [ProductionBoxController],
  imports: [PrismaModule],
})
export class ProductionBoxModule {}
