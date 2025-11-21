import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { RondelsService } from "./rondels.service";
@ApiTags("Типы рондолей")
@Controller("rondels")
export class RondelsController {
  constructor(private readonly rondelService: RondelsService) {}
  @ApiOperation({ summary: "Получить все рондоли" })
  @Get("/")
  getAllRondels() {
    return this.rondelService.getAllRondels();
  }
}
