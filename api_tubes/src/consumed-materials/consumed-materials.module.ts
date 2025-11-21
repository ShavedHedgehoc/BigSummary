import { Module } from "@nestjs/common";
import { ConsumedMaterialsService } from "./consumed-materials.service";
import { ConsumedMaterialsController } from "./consumed-materials.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  providers: [ConsumedMaterialsService],
  controllers: [ConsumedMaterialsController],
  imports: [PrismaModule],
})
export class ConsumedMaterialsModule {}
