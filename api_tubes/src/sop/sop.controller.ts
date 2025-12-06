import { Controller, Get, Query } from "@nestjs/common";
import { SopService } from "./sop.service";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("СОП")
@Controller("sop")
export class SopController {
  constructor(private readonly sopService: SopService) {}

  @ApiOperation({ summary: "Получить СОП экструзии по id операции" })
  @Get("/extrusion")
  getExtrusionSop(@Query("operation_id") operation_id: string) {
    return this.sopService.getExtrusionSop(Number(operation_id));
  }
  @Get("/varnish")
  getVarnishSop(@Query("operation_id") operation_id: string) {
    return this.sopService.getVarnishSop(Number(operation_id));
  }
  @Get("/offset")
  getOffsetSop(@Query("operation_id") operation_id: string) {
    return this.sopService.getOffsetSop(Number(operation_id));
  }
  @Get("/sealant")
  getSealantSop(@Query("operation_id") operation_id: string) {
    return this.sopService.getSealantSop(Number(operation_id));
  }
}
