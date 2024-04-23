import { Body, Controller, Get, Post } from "@nestjs/common";
import Apparatus from "./apparatuses.model";
import { CreateApparatusDto } from "./dto/create-apparatus.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApparatusesService } from "./apparatuses.service";

@ApiTags("Аппараты")
@Controller("apparatuses")
export class ApparatusesController {
  constructor(private apparatusService: ApparatusesService) {}

  @ApiOperation({ summary: "Получить все аппараты" })
  @ApiResponse({ status: 200, type: [Apparatus] })
  @Get()
  getAll() {
    return this.apparatusService.getAllApparatuses();
  }

  @ApiOperation({ summary: "Создание нового аппарата" })
  @ApiResponse({ status: 201, type: Apparatus })

  //   @ApiResponse({ status: 400, type: Error })
  @Post()
  create(@Body() dto: CreateApparatusDto) {
    return this.apparatusService.createApparatus(dto);
  }
}
