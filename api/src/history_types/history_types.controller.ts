import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HistoryTypesService } from "./history_types.service";
import HistoryType from "./history_types.model";
import { CreateHistoryTypeDto } from "./dto/create-history-type.dto";

@ApiTags("Типы записей")
@Controller("history-types")
export class HistoryTypesController {
  constructor(private historyTypesService: HistoryTypesService) {}

  @ApiOperation({ summary: "Получить все типы записей" })
  @ApiResponse({ status: 200, type: [HistoryType] })
  @Get()
  getAll() {
    return this.historyTypesService.getAllHistoryTypes();
  }

  @ApiOperation({ summary: "Получить все типы записей для основ" })
  @ApiResponse({ status: 200, type: [HistoryType] })
  @Get("/for_bases")
  getAllForBases() {
    return this.historyTypesService.getAllBaseHistoryTypes();
  }

  @ApiOperation({ summary: "Создание нового типа записи" })
  @ApiResponse({ status: 201, type: [HistoryType] })
  @Post()
  create(@Body() dto: CreateHistoryTypeDto) {
    return this.historyTypesService.createHistoryType(dto);
  }
}
