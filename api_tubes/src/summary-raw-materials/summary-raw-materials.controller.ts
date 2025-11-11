import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SummaryRawMaterialsService } from "./summary-raw-materials.service";
import { GetSummaryRawMaterialsBySummaryIdDto } from "./dto/get-summary-raw-materials-by-summary-id-dto";

@ApiTags("Специфакации")
@Controller("summary-raw-materials")
export class SummaryRawMaterialsController {
  constructor(private readonly summaryRawMaterialsService: SummaryRawMaterialsService) {}
  @Post("/by_summary_id")
  getSummaryRawMaterialsBySummaryId(@Body() dto: GetSummaryRawMaterialsBySummaryIdDto) {
    return this.summaryRawMaterialsService.getSummaryRawMaterialsBySummaryId(dto);
  }
}
