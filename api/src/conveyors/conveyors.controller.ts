import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ConveyorsService } from "./conveyors.service";
import Conveyor from "./conveyor.model";
import { CreateConveyorDto } from "./dto/create-conveyor.dto";

@ApiTags("Конвейеры")
@Controller("conveyors")
export class ConveyorsController {
  constructor(private conveyorsService: ConveyorsService) {}

  @ApiOperation({ summary: "Получить все варки" })
  @ApiResponse({ status: 200, type: [Conveyor] })
  @Get()
  getAll() {
    return this.conveyorsService.getAllConveyors();
  }

  @ApiOperation({ summary: "Создание новой варки" })
  @ApiResponse({ status: 201, type: Conveyor })

  //   @ApiResponse({ status: 400, type: Error })
  @Post()
  create(@Body() dto: CreateConveyorDto) {
    return this.conveyorsService.createConveyor(dto);
  }
}
