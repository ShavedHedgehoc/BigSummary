import { Body, Controller, Post } from "@nestjs/common";
import { TraceTrademarksService } from "./trace_trademarks.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetTraceTrademarksDto } from "./dto/get-trace-trademarks.dto";

@ApiTags("Торговые названия")
@Controller("trace-trademarks")
export class TraceTrademarksController {
  constructor(private traceTrademarksService: TraceTrademarksService) {}

  @ApiOperation({ summary: "Получить торговые названия с фильтром" })
  @Post("/")
  getInventories(@Body() dto: GetTraceTrademarksDto) {
    return this.traceTrademarksService.getTrademarks(dto);
  }
}
