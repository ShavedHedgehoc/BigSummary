import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateBoilDto } from "./dto/create-boil.dto";
import Boil from "./boil.model";
import { BoilsService } from "./boils.service";

@ApiTags("Варки")
@Controller("boils")
export class BoilsController {
  constructor(private boilsService: BoilsService) {}

  @ApiOperation({ summary: "Получить все варки" })
  @ApiResponse({ status: 200, type: [Boil] })
  @Get()
  getAll() {
    return this.boilsService.getAllBoils();
  }

  @ApiOperation({ summary: "Создание новой варки" })
  @ApiResponse({ status: 201, type: Boil })
  @Post()
  create(@Body() dto: CreateBoilDto) {
    return this.boilsService.getOrCreateByValue(dto.value);
  }
}
