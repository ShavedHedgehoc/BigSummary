import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { RecordsService } from "./records.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import Record from "./records.model";
import { CreateRecordDto } from "./dto/create-record.dto";
import { BulkCreateRecordsDto } from "./dto/bulk-create-records.dto";
import { FetchRelatedRecordsDto } from "./dto/fetch-related-records.dto";

@ApiTags("Записи сводок")
@Controller("records")
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @ApiOperation({ summary: "Создание новой строки сводки" })
  @ApiResponse({ status: 201, type: Record })
  @Post()
  create(@Body() dto: CreateRecordDto) {
    return this.recordsService.createRecord(dto);
  }

  @ApiOperation({ summary: "Создание нового документа сводки" })
  @ApiResponse({ status: 201 })
  @Post("/bulkcreate")
  bulkCreatecreate(@Body() dto: BulkCreateRecordsDto) {
    return this.recordsService.bulkCreateRecords(dto);
  }

  @ApiOperation({ summary: "Получить строки текущей сводки с партией сводки" })
  @ApiResponse({ status: 200, type: [Record] })
  @Get("/:boil")
  getRecordsByBoil(@Param("boil") boil: string) {
    return this.recordsService.getCurrentRecordsByBoil(boil);
  }

  @ApiOperation({ summary: "Получить строки текущей сводки по партии, коду продукта и коду площадки" })
  @ApiResponse({ status: 200, type: [Record] })
  @Post("/related")
  getRelatedRecords(@Body() dto: FetchRelatedRecordsDto) {
    return this.recordsService.getRelatedRecords(dto);
  }

  @ApiOperation({ summary: "Получить строку сводки с деталями по id" })
  @ApiResponse({ status: 200, type: [Record] })
  @Get("/detail/:id")
  getRecordsById(@Param("id") id: string) {
    return this.recordsService.getByIdWithDetails(id);
  }
}
