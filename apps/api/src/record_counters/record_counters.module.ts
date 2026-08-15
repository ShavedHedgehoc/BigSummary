import { Module } from "@nestjs/common";
import { RecordCountersController } from "./record_counters.controller";
import { RecordCountersService } from "./record_counters.service";
import { SequelizeModule } from "@nestjs/sequelize";
import RecordCounter from "./record_counters.model";

@Module({
  controllers: [RecordCountersController],
  providers: [RecordCountersService],
  imports: [SequelizeModule.forFeature([RecordCounter])],
  exports: [RecordCountersService],
})
export class RecordCountersModule {}
