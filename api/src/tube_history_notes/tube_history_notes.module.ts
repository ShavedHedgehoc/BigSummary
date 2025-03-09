import { Module } from "@nestjs/common";
import { TubeHistoryNotesService } from "./tube_history_notes.service";
import { SequelizeModule } from "@nestjs/sequelize";
import TubeHistoryNote from "./tube_history_notes.model";

@Module({
  providers: [TubeHistoryNotesService],
  imports: [SequelizeModule.forFeature([TubeHistoryNote])],
})
export class TubeHistoryNotesModule {}
