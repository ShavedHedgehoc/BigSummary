import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PlantsService } from "./plants.service";
import Plant from "./plant.model";
import { CreatePlantDto } from "./dto/create-plant.dto";

@ApiTags("Площадки")
@Controller("plants")
export class PlantsController {
  constructor(private plantService: PlantsService) {}

  @ApiOperation({ summary: "Получить все площадки" })
  @ApiResponse({ status: 200, type: [Plant] })
  @Get()
  getAll() {
    return this.plantService.getAllPlants();
  }

  @ApiOperation({ summary: "Получить площадку по имени" })
  @ApiResponse({ status: 200, type: Plant })
  @Get("/:plantName")
  getByName(@Param("plantName") plantName: string) {
    return this.plantService.getPlantByValue(plantName);
  }

  @ApiOperation({ summary: "Создание новой площадки" })
  @ApiResponse({ status: 201, type: Plant })
  @Post()
  create(@Body() dto: CreatePlantDto) {
    return this.plantService.createPlant(dto);
  }
}
