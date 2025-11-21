import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { SummariesService } from "./summaries.service";

@ApiTags("Сводки")
@Controller("summaries")
export class SummariesController {
  constructor(private readonly summaryService: SummariesService) {}
  @ApiOperation({ summary: "Получить активную сводку по id конвейера" })
  @Get("/active")
  getActiveSummaryRecordByConveyorId(@Query("conveyor_id") conveyor_id: string) {
    return this.summaryService.getActiveSummaryRecordByConveyorId(Number(conveyor_id));
  }
}
