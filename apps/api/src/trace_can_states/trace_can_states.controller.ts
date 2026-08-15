import { Controller, Get } from "@nestjs/common";
import { TraceCanStatesService } from "./trace_can_states.service";

@Controller("trace-can-states")
export class TraceCanStatesController {
  constructor(private traceCanStatesService: TraceCanStatesService) {}
  @Get()
  getAllStates() {
    return this.traceCanStatesService.getCanStates();
  }
}
