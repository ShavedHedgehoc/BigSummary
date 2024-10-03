import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RecordDetailService } from "./record.detail.service";

@ApiTags("Детали записи сводки")
@Controller("record_detail")
export class RecordDetailController {
  constructor(private recordDetailService: RecordDetailService) {}
  @ApiOperation({ summary: "Получить сводку по id документа" })
  //   @ApiResponse({ status: 200, type: [Doc] })
  @Get("/:record_id")
  getDocDetailByDocId(@Param("record_id") record_id: string) {
    return this.recordDetailService.getRecordDetail(Number(record_id));
  }
}
