import { Module } from "@nestjs/common";
import { OperationsService } from "./operations.service";
import { OperationsController } from "./operations.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  providers: [OperationsService],
  controllers: [OperationsController],
  imports: [PrismaModule],
})
export class OperationsModule {}
