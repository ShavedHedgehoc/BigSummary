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
}
