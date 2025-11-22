import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ConveyorsService } from "./conveyors.service";

@ApiTags("Конвейеры")
@Controller("conveyors")
export class ConveyorsController {
  constructor(private readonly conveyorService: ConveyorsService) {}
  @ApiOperation({ summary: "Получить все конвейеры" })
  @Get("/all")
  getAllconveyors() {
    return this.conveyorService.getAllConveyors();
  }
  @ApiOperation({ summary: "Получить конвейер по id" })
  @Get("/:id")
  getConveyorById(@Param("id") id: string) {
    return this.conveyorService.getConveyorById(Number(id));
  }
  // used in dashboard conveyor service
  @ApiOperation({ summary: "Получить конвейер по имени" })
  @Get()
  getConveyorByName(@Query("name") name: string) {
    return this.conveyorService.getConveyorByName(name);
  }
}
