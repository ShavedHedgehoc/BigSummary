import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OccupationsService } from "./occupations.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import Occupation from "./occupations.model";
import { CreateOccupationDto } from "./dto/create-occupation.dto";

@ApiTags("Специальности пользователей рабочей станции")
@Controller("occupations")
export class OccupationsController {
  constructor(private occupationsService: OccupationsService) {}

  @ApiOperation({ summary: "Получить все специальности" })
  @ApiResponse({ status: 200, type: [Occupation] })
  @Get()
  getAll() {
    return this.occupationsService.getAllOccupations();
  }

  // @ApiOperation({ summary: "Создание новой специальности" })
  // @ApiResponse({ status: 201, type: Occupation })
  // @Post()
  // create(@Body() dto: CreateOccupationDto) {
  //   return this.occupationsService.createOccupation(dto);
  // }

  // @ApiOperation({ summary: "Получение специальности по значению" })
  // @ApiResponse({ status: 200, type: Occupation })
  // @Get("/:value")
  // getByValue(@Param("value") value: string) {
  //   return this.occupationsService.getOccupationByValue(value);
  // }
}
