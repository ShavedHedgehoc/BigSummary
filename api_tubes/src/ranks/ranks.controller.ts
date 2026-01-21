import { Controller, Get } from "@nestjs/common";
import { RanksService } from "./ranks.service";
import { ApiOperation } from "@nestjs/swagger";

@Controller("ranks")
export class RanksController {
  constructor(private readonly ranksService: RanksService) {}

  @ApiOperation({ summary: "Получить разряды" })
  @Get()
  getRanks() {
    return this.ranksService.getRanks();
  }
}
