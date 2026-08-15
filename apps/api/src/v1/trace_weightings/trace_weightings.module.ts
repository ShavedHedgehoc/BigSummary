import { Module } from "@nestjs/common";
import { TraceWeightingsService } from "./trace_weightings.service";
import { TraceWeightingsController } from "./trace_weightings.controller";
import TraceWeighting from "../trace_models/trace_weighting.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  providers: [TraceWeightingsService],
  controllers: [TraceWeightingsController],
  imports: [SequelizeModule.forFeature([TraceWeighting], "trace_connection")],
  exports: [TraceWeightingsService],
})
export class TraceWeightingsModule {}
