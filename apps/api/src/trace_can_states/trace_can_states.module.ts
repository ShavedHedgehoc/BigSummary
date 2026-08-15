import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TraceCanStatesService } from "./trace_can_states.service";
import { TraceCanStatesController } from "./trace_can_states.controller";
import TraceCanState from "src/trace_models/trace_can_state.model";

@Module({
  providers: [TraceCanStatesService],
  imports: [SequelizeModule.forFeature([TraceCanState], "trace_connection")],
  controllers: [TraceCanStatesController],
  exports: [TraceCanStatesService],
})
export class TraceCanStatesModule {}
