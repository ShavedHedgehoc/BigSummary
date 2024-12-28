import { Module } from "@nestjs/common";
import { TraceLoadsService } from "./trace_loads.service";
import { TraceLoadsController } from "./trace_loads.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import TraceLoad from "src/trace_models/trace_loads.model";

@Module({
  providers: [TraceLoadsService],
  controllers: [TraceLoadsController],
  imports: [SequelizeModule.forFeature([TraceLoad], "trace_connection")],
  exports: [TraceLoadsService],
})
export class TraceLoadsModule {}
