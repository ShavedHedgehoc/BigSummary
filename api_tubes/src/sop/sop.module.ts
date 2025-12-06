import { Module } from "@nestjs/common";
import { SopService } from "./sop.service";
import { SopController } from "./sop.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  providers: [SopService],
  controllers: [SopController],
  imports: [PrismaModule],
})
export class SopModule {}
