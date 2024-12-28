import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { TraceWeightingsService } from "./trace_weightings.service";

@ApiTags("Взвешивания (для теста)")
@Controller("trace-weightings")
export class TraceWeightingsController {
  constructor(private traceWeightingService: TraceWeightingsService) {}
  @ApiOperation({ summary: "Получить строки взвешиваний из прослеживаемости по id партии" })
  @Get("/:batchPK")
  getWeightingsRows(@Param("batchPK") batchPK: string) {
    return this.traceWeightingService.getWeightingsRows(Number(batchPK));
  }
}
