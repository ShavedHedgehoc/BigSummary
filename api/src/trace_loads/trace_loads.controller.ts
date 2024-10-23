import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { TraceLoadsService } from "./trace_loads.service";

@ApiTags("Загрузки (для теста)")
@Controller("trace-loads")
export class TraceLoadsController {
  constructor(private traceLoadService: TraceLoadsService) {}
  @ApiOperation({ summary: "Получить строки загрузок из прослеживаемости по id партии" })
  @Get("/:batchPK")
  getLoadsRows(@Param("batchPK") batchPK: string) {
    return this.traceLoadService.getLoadsRows(Number(batchPK));
  }
}
