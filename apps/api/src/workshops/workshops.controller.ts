import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import Workshop from "./workshop.model";
import { WorkshopsService } from "./workshops.service";
import { CreateWorkshopDto } from "./dto/create-workshop.dto";

@ApiTags("Перечень цехов")
@Controller("workshops")
export class WorkshopsController {
  constructor(private workshopsService: WorkshopsService) {}

  @ApiOperation({ summary: "Получить список цехов" })
  @ApiResponse({ status: 200, type: [Workshop] })
  @Get()
  getAll() {
    return this.workshopsService.getAllWorkshops();
  }

  @ApiOperation({ summary: "Создание нового цеха" })
  @ApiResponse({ status: 201, type: Workshop })

  //   @ApiResponse({ status: 400, type: Error })
  @Post()
  create(@Body() dto: CreateWorkshopDto) {
    return this.workshopsService.createWorkshop(dto);
  }
}
