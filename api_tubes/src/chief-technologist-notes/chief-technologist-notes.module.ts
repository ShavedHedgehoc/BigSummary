import { Module } from "@nestjs/common";
import { ChiefTechnologistNotesService } from "./chief-technologist-notes.service";
import { ChiefTechnologistNotesController } from "./chief-technologist-notes.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [ChiefTechnologistNotesService],
  controllers: [ChiefTechnologistNotesController],
})
export class ChiefTechnologistNotesModule {}
