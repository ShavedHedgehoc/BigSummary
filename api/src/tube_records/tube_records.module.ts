import { Module } from "@nestjs/common";
import { TubeRecordsService } from "./tube_records.service";
import TubeRecord from "./tube_records.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { TubeRecordsController } from "./tube_records.controller";

@Module({
  providers: [TubeRecordsService],
  imports: [SequelizeModule.forFeature([TubeRecord])],
  controllers: [TubeRecordsController],
})
export class TubeRecordsModule {}
