import { Module } from "@nestjs/common";
import { PicturesService } from "./pictures.service";
import { PicturesController } from "./pictures.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  providers: [PicturesService],
  controllers: [PicturesController],
  imports: [PrismaModule],
})
export class PicturesModule {}
