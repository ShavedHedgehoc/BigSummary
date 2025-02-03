import { Module } from "@nestjs/common";
import { RecordRegulationsService } from "./record_regulations.service";
import { SequelizeModule } from "@nestjs/sequelize";
import RecordRegulation from "./record_regulations.model";

@Module({
  imports: [SequelizeModule.forFeature([RecordRegulation])],
  providers: [RecordRegulationsService],
  exports: [RecordRegulationsService],
})
export class RecordRegulationsModule {}
