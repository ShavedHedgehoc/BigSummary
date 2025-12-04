import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { SummariesService } from "./summaries.service";
import { CreateSummaryDto } from "./dto/create-summary.dto";

@ApiTags("Сводки")
@Controller("summaries")
export class SummariesController {
  constructor(private readonly summaryService: SummariesService) {}
  @ApiOperation({ summary: "Получить активную сводку по id конвейера" })
  @Get("/active")
  getActiveSummaryRecordByConveyorId(@Query("conveyor_id") conveyor_id: string) {
    return this.summaryService.getActiveSummaryRecordByConveyorId(Number(conveyor_id));
  }

  @ApiOperation({ summary: "Создать записи сводок" })
  @Post()
  bulkCreateSummaries(@Body() dto: CreateSummaryDto) {
    return this.summaryService.bulkCreateSummaries(dto);
  }
}
