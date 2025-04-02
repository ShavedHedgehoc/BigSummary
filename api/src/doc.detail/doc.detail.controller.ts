import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { DocDetailService } from "./doc.detail.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetCurrentDocDto } from "./dto/get-current-doc.dto";
import { GetDocByIdDto } from "./dto/get-doc-by-id.dto";
import { TimeReportDto } from "./dto/time-report.dto";

@ApiTags("Сводки тест")
@Controller("doc_detail")
export class DocDetailController {
  constructor(private docDetailService: DocDetailService) {}

  @ApiOperation({ summary: "Получить текущую сводку по id площадки" })
  //   @ApiResponse({ status: 200, type: [Doc] })
  @Get("/current/:plantId")
  getCurrentDocDetail(@Param("plantId") plantId: string) {
    return this.docDetailService.getCurrentDocDetail(Number(plantId));
  }

  @ApiOperation({ summary: "Получить текущую сводку по id площадки" })
  //   @ApiResponse({ status: 200, type: [Doc] })
  @Get("/current_apps/:plantId")
  getCurrentAppDocDetail(@Param("plantId") plantId: string) {
    return this.docDetailService.getCurrentAppDocDetail(Number(plantId));
  }

  @ApiOperation({ summary: "Получить завтрашнюю сводку по id площадки" })
  //   @ApiResponse({ status: 200, type: [Doc] })
  @Get("/tomorrow_apps/:plantId")
  getTomorrowAppDocDetail(@Param("plantId") plantId: string) {
    return this.docDetailService.getTomorrowAppDocDetail(Number(plantId));
  }

  @ApiOperation({ summary: "Получить сводку по id документа" })
  //   @ApiResponse({ status: 200, type: [Doc] })
  @Get("/:doc_id")
  getDocDetailByDocId(@Param("doc_id") doc_id: string) {
    return this.docDetailService.getDocDetailByDocId(Number(doc_id));
  }

  @ApiOperation({ summary: "Получить строку сводки по id" })
  //   @ApiResponse({ status: 200, type: [Doc] })
  @Get("/record/:record_id")
  getRecordDetail(@Param("record_id") record_id: string) {
    return this.docDetailService.getDocRowDetailData(Number(record_id));
  }

  @ApiOperation({ summary: "Получить все записи с параметрами" })
  @Post()
  getCurrentDocWithParams(@Body() dto: GetCurrentDocDto) {
    return this.docDetailService.getCurrentDocDetailWithFilter(dto);
  }

  @Post("/time_report")
  getTimeReport(@Body() dto: TimeReportDto) {
    return this.docDetailService.getTimeReport(dto);
  }

  @ApiOperation({ summary: "Получить все записи с параметрами по id документа" })
  @Post("/by_id")
  getDocByIDWithParams(@Body() dto: GetDocByIdDto) {
    return this.docDetailService.getDocDetailByIdWithFilter(dto);
  }
}
