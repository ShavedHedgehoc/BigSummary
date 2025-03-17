import { Controller, Get, Param } from "@nestjs/common";
import { TraceCanRecordsService } from "./trace_can_records.service";

@Controller("trace-can-records")
export class TraceCanRecordsController {
  constructor(private traceRecordsService: TraceCanRecordsService) {}

  @Get("/last_ten/:id")
  getLastTenRecords(@Param("id") id: number) {
    return this.traceRecordsService.getLastTenRecordsById(id);
  }
}
