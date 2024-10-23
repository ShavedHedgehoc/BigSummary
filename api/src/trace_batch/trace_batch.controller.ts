import { Controller, Get, Param } from "@nestjs/common";
import { TraceBatchService } from "./trace_batch.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
@ApiTags("Варки (для теста)")
@Controller("trace-batch")
export class TraceBatchController {
  constructor(private traceBatchService: TraceBatchService) {}
  @ApiOperation({ summary: "Получить партию из прослеживаемости по имени" })
  @Get("/:batchName")
  getTraceBatchByName(@Param("batchName") batchName: string) {
    return this.traceBatchService.getByName(batchName);
  }
}
