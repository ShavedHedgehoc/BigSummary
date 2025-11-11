import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SummaryRawMaterialsCurrentService } from "./summary-raw-materials-current.service";
import { CreateSummaryRawMaterialCurrentDto } from "./dto/create-summary-raw-materials-current.dto";
import { GetSummaryRawMaterialCurrentDto } from "./dto/get-summary-raw-materials-current.dto";

@ApiTags("Текущие комплектующие")
@Controller("summary-raw-material-current")
export class SummaryRawMaterialsCurrentController {
  constructor(private readonly summaryRawMaterialCurrentService: SummaryRawMaterialsCurrentService) {}
  @Post("/create")
  createSummaryRawMaterialsCurrentRecord(@Body() dto: CreateSummaryRawMaterialCurrentDto) {
    return this.summaryRawMaterialCurrentService.createSummaryRawMaterialsCurrentRecord(dto);
  }

  @Post("/get_list")
  getCurrentRawMaterialsBySummaryIdAndPostId(@Body() dto: GetSummaryRawMaterialCurrentDto) {
    return this.summaryRawMaterialCurrentService.getCurrentRawMaterialsBySummaryIdAndPostId(dto);
  }
}
