import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HistoriesService } from "./histories.service";
import History from "./histories.model";

import { AddHistoryDtoNew } from "./dto/add-histories.dto";
import { Roles } from "src/auth/roles-auth.decorator";
import { RoleGuard } from "src/auth/role-guard";

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
  @Roles("GODMODE", "LABORATORY")
  @UseGuards(RoleGuard)
  @Post("/direct")
  createDirect(@Body() dto: AddHistoryDtoNew) {
    return this.historiesService.directAddHistorie(dto);
  }

  @ApiOperation({ summary: "Удалить запись по id записи" })
  @ApiResponse({ status: 201 })
  @Roles("GODMODE")
  @UseGuards(RoleGuard)
  @Delete("/:recordId")
  deleteByRecordId(@Param("recordId") recordId: string) {
    return this.historiesService.deleteHistory(Number(recordId));
  }
}
