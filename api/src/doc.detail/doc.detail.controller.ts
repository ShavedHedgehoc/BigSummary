import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { DocDetailService } from "./doc.detail.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetCurrentDocDto } from "./dto/get-current-doc.dto";

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
  //   @ApiResponse({ status: 200, type: [History] })
  @Post()
  // getCurrentDocWithParams(@Param("plantId") plantId: string, @Body() dto: GetCurrentDocDto) {
  getCurrentDocWithParams(@Body() dto: GetCurrentDocDto) {
    return this.docDetailService.getCurrentDocDetailWithFilter(dto);
  }
}
