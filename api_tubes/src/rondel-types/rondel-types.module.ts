import { Module } from "@nestjs/common";
import { RondelTypesService } from "./rondel-types.service";
import { RondelTypesController } from "./rondel-types.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  providers: [RondelTypesService],
  controllers: [RondelTypesController],
  imports: [PrismaModule],
})
export class RondelTypesModule {}
