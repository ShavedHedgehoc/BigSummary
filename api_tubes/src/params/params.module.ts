import { Module } from "@nestjs/common";
import { ParamsService } from "./params.service";
import { ParamsController } from "./params.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  controllers: [ParamsController],
  providers: [ParamsService],
  imports: [PrismaModule],
})
export class ParamsModule {}
