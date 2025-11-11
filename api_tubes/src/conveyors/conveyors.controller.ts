import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ConveyorsService } from "./conveyors.service";

@ApiTags("Конвейеры")
@Controller("conveyors")
export class ConveyorsController {
  constructor(private readonly conveyorService: ConveyorsService) {}
  @ApiOperation({ summary: "Получить конвейер по имени" })
  @Get("/:conveyor_name")
  getConveyorByName(@Param("conveyor_name") conveyor_name: string) {
    return this.conveyorService.getConveyorByName(conveyor_name);
  }
}
