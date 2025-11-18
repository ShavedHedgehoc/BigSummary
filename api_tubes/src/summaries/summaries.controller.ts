import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SummariesService } from "./summaries.service";

@ApiTags("Записи сводок")
@Controller("summaries")
export class SummariesController {
  constructor(private readonly summaryService: SummariesService) {}
  @Get("/active/:conveyor_id")
  getActiveSummaryRecordByConveyorId(@Param("conveyor_id") conveyor_id: string) {
    return this.summaryService.getActiveSummaryRecordByConveyorId(Number(conveyor_id));
  }

  @Get("/active_counters/:id")
  getActiveSummaryCountersByConveyorId(@Param("id") id: string) {
    return this.summaryService.getActiveSummaryCountersById(Number(id));
  }
}
