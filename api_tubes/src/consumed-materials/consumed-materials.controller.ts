import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateConsumedMaterialDto } from "./dto/create-consumed-material.dto";
import { ConsumedMaterialsService } from "./consumed-materials.service";

@ApiTags("Используемые комплектующие")
@Controller("consumed-materials")
export class ConsumedMaterialsController {
  constructor(private readonly consumedMaterialService: ConsumedMaterialsService) {}
  @ApiOperation({ summary: "Создать запись используемых комплектующих" })
  @Post()
  createConsumedMaterial(@Body() dto: CreateConsumedMaterialDto) {
    return this.consumedMaterialService.createConsumedMaterial(dto);
  }
}
