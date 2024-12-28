import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { TraceTechnologyService } from "./trace_technology.service";

@ApiTags("Технология (для теста)")
@Controller("trace-technology")
export class TraceTechnologyController {
  constructor(private traceTechnologyService: TraceTechnologyService) {}
  @ApiOperation({ summary: "Получить строки технологии и взвешиваний из прослеживаемости по id партии" })
  @Get("/:batchPK")
  getWeightingsRows(@Param("batchPK") batchPK: string) {
    // return this.traceTechnologyService.getTechnologyRows(Number(batchPK));
    return this.traceTechnologyService.getBoilCard(Number(batchPK));
  }
}
