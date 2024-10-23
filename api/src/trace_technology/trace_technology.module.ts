import { Module } from "@nestjs/common";
import { TraceTechnologyService } from "./trace_technology.service";
import { TraceTechnologyController } from "./trace_technology.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import TraceBoilRecord from "src/trace_models/trace_boil_record.model";
import { TraceLoadsModule } from "src/trace_loads/trace_loads.module";

@Module({
  providers: [TraceTechnologyService],
  controllers: [TraceTechnologyController],
  imports: [SequelizeModule.forFeature([TraceBoilRecord], "trace_connection"), TraceLoadsModule],
  exports: [TraceTechnologyService],
})
export class TraceTechnologyModule {}
