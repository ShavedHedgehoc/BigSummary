import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SeriesService } from "./series.service";
import Serie from "./series.model";
import { CreateSerieDto } from "./dto/create-serie.dto";

@ApiTags("Серии продуктов")
@Controller("series")
export class SeriesController {
  constructor(private seriesService: SeriesService) {}

  @ApiOperation({ summary: "Получить все серии продуктов" })
  @ApiResponse({ status: 200, type: [Serie] })
  @Get()
  getAll() {
    return this.seriesService.getAllSeries();
  }

  @ApiOperation({ summary: "Создание новой серии" })
  @ApiResponse({ status: 201, type: Serie })
  @Post()
  create(@Body() serieDto: CreateSerieDto) {
    return this.seriesService.createSerie(serieDto);
  }
}
