import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HistoriesService } from "./histories.service";
import History from "./histories.model";
import { CreateHistoryDto } from "./dto/create-history.dto";
import { AddHistoriesDto, AddHistoryDirectDto } from "./dto/add-histories.dto";

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

  @ApiOperation({ summary: "Получить последнюю запись по id строки сводки" })
  @ApiResponse({ status: 200, type: [History] })
  @Get("/last_ten")
  getLastTenHistories() {
    return this.historiesService.getLastTenHistories();
  }

  @ApiOperation({ summary: "Получить все записи по id строки сводки" })
  @ApiResponse({ status: 200, type: [History] })
  @Get("/all/:recordId")
  getAllHistoriesByRecordId(@Param("recordId") recordId: string) {
    return this.historiesService.getAllHistoriesByRecId(Number(recordId));
  }

  @ApiOperation({ summary: "Создание новой записи" })
  @ApiResponse({ status: 201, type: History })
  @Post()
  create(@Body() dto: AddHistoriesDto) {
    return this.historiesService.addHistoriesToRecords(dto);
  }

  @ApiOperation({ summary: "Создание новой записи напрямую" })
  @ApiResponse({ status: 201, type: History })
  @Post("/direct")
  createDirect(@Body() dto: AddHistoryDirectDto) {
    return this.historiesService.directAddHistorie(dto);
  }

  @ApiOperation({ summary: "Удалить запись по id записи" })
  @ApiResponse({ status: 201 })
  @Delete("/:recordId")
  deleteByRecordId(@Param("recordId") recordId: string) {
    return this.historiesService.deleteHistory(Number(recordId));
  }
}
