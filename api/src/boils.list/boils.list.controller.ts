import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { BoilsListService } from "./boils.list.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetBoilsDto } from "src/boils/dto/get-boils.dto";

@ApiTags("Список основ")
@Controller("boils_list")
export class BoilsListController {
  constructor(private boilsListService: BoilsListService) {}
  @ApiOperation({ summary: "Получить все типы записей с параметрами" })
  @Post()
  getAllWithParams(@Body() dto: GetBoilsDto) {
    return this.boilsListService.getBoilsListWithFilter(dto);
  }

  @ApiOperation({ summary: "Получить все типы записей с параметрами" })
  @Post("/report")
  getReportWithParams(@Body() dto: GetBoilsDto) {
    return this.boilsListService.getBoilsReportWithFilter(dto);
  }

  @ApiOperation({ summary: "Получить запись по id" })
  @Get("/boil/:boil_id")
  getBoilById(@Param("boil_id") boil_id: string) {
    return this.boilsListService.getBoilsListRow(Number(boil_id));
  }
}
