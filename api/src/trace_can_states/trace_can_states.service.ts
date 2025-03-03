import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import TraceCanState from "src/trace_models/trace_can_state.model";

@Injectable()
export class TraceCanStatesService {
  constructor(
    @InjectModel(TraceCanState, "trace_connection")
    private traceCanStateRepository: typeof TraceCanState
  ) {}

  async getCanStates() {
    const states = await this.traceCanStateRepository.findAll();
    return states;
  }
}
