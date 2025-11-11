import { Module } from "@nestjs/common";
import { SummariesService } from "./summaries.service";
import { SummariesController } from "./summaries.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  providers: [SummariesService],
  controllers: [SummariesController],
  imports: [PrismaModule],
})
export class SummariesModule {}
