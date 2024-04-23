import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HistoriesService } from "./histories.service";
import History from "./histories.model";
import { CreateHistoryDto } from "./dto/create-history.dto";

@ApiTags("Записи")
@Controller("histories")
export class HistoriesController {
  constructor(private historiesService: HistoriesService) {}

  @ApiOperation({ summary: "Получить все типы записей" })
  @ApiResponse({ status: 200, type: [History] })
  @Get()
  getAll() {
    return this.historiesService.getAllHistories();
  }

  @ApiOperation({ summary: "Получить последнюю запись по id строки сводки" })
  @ApiResponse({ status: 200, type: [History] })
  @Get("/last/:recordId")
  getLastByRecordId(@Param("recordId") recordId: string) {
    return this.historiesService.getLastHistoryByRecId(Number(recordId));
  }

  @ApiOperation({ summary: "Создание новой записи" })
  @ApiResponse({ status: 201, type: History })
  @Post()
  create(@Body() dto: CreateHistoryDto) {
    return this.historiesService.createHistory(dto);
  }
}
