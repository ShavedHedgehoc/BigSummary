import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HistoriesService } from "./histories.service";
import History from "./histories.model";
import { CreateHistoryDto } from "./dto/create-history.dto";
import { AddHistoriesDto, AddHistoryDirectDto, AddHistoryDtoNew } from "./dto/add-histories.dto";

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

  // @ApiOperation({ summary: "Получить последнюю запись по id строки сводки" })
  // @ApiResponse({ status: 200, type: [History] })
  // @Get("/last/:recordId")
  // getLastByRecordId(@Param("recordId") recordId: string) {
  //   return this.historiesService.getLastHistoryByRecId(Number(recordId));
  // }

  @ApiOperation({ summary: "Получить последнюю запись по id строки сводки" })
  @ApiResponse({ status: 200, type: [History] })
  @Get("/last_ten/:plant_id")
  getLastTenHistories(@Param("plant_id") plant_id: string) {
    return this.historiesService.getLastTenHistories(Number(plant_id));
  }

  @ApiOperation({ summary: "Получить все записи по id строки сводки" })
  @ApiResponse({ status: 200, type: [History] })
  @Get("/all/:recordId")
  getAllHistoriesByRecordId(@Param("recordId") recordId: string) {
    return this.historiesService.getAllHistoriesByRecId(Number(recordId));
  }

  @ApiOperation({ summary: "Получить все записи по id варки" })
  @ApiResponse({ status: 200, type: [History] })
  @Get("/boil/:boilId")
  getAllHistoriesByBoilId(@Param("boilId") boilId: string) {
    return this.historiesService.getAllHistoriesByBoilId(Number(boilId));
  }

  @ApiOperation({ summary: "Создание новой записи" })
  @ApiResponse({ status: 201, type: History })
  @Post()
  create(@Body() dto: AddHistoryDtoNew) {
    return this.historiesService.addHistorie(dto);
  }

  @ApiOperation({ summary: "Создание новой записи напрямую" })
  @ApiResponse({ status: 201, type: History })
  @Post("/direct")
  // createDirect(@Body() dto: AddHistoryDirectDto) {
  createDirect(@Body() dto: AddHistoryDtoNew) {
    return this.historiesService.directAddHistorie(dto);
  }

  @ApiOperation({ summary: "Удалить запись по id записи" })
  @ApiResponse({ status: 201 })
  @Delete("/:recordId")
  deleteByRecordId(@Param("recordId") recordId: string) {
    return this.historiesService.deleteHistory(Number(recordId));
  }
  // @ApiOperation({ summary: "Создание новой записи типа base_check" })
  // @ApiResponse({ status: 201, type: History })
  // @Post("/base_check")
  // createBaseCheck(@Body() dto: AddHistoryDtoNew) {
  //   return this.historiesService.addBaseCheckHistory(dto);
  // }
}
