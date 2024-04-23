import { Body, Controller, Post } from "@nestjs/common";
import { RecordsService } from "./records.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import Record from "./records.model";
import { CreateRecordDto } from "./dto/create-record.dto";

@ApiTags("Записи сводок")
@Controller("records")
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @ApiOperation({ summary: "Создание нового строки сводки" })
  @ApiResponse({ status: 201, type: Record })
  @Post()
  create(@Body() dto: CreateRecordDto) {
    return this.recordsService.createRecord(dto);
  }
}
