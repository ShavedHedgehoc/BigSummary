import { Module } from "@nestjs/common";
import { StatusesService } from "./statuses.service";
import { StatusesController } from "./statuses.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  providers: [StatusesService],
  controllers: [StatusesController],
  imports: [PrismaModule],
})
export class StatusesModule {}
