import { Module } from "@nestjs/common";
import { TubeRecordsService } from "./tube_records.service";
import TubeRecord from "./tube_records.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  providers: [TubeRecordsService],
  imports: [SequelizeModule.forFeature([TubeRecord])],
})
export class TubeRecordsModule {}
