import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RondelTypesService } from "./rondel-types.service";

@ApiTags("Типы рондолей")
@Controller("rondel-types")
export class RondelTypesController {
  constructor(private readonly rondelTypesService: RondelTypesService) {}
  @Get("/")
  getAllRondelTypes() {
    return this.rondelTypesService.getAllRondelTypes();
  }
}
