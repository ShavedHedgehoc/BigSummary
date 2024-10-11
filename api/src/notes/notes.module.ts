import { Module } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { SequelizeModule } from "@nestjs/sequelize";
import Note from "./notes.model";

@Module({
  providers: [NotesService],
  imports: [SequelizeModule.forFeature([Note])],
  exports: [NotesService],
})
export class NotesModule {}
