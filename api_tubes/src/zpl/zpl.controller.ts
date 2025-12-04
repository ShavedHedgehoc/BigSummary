import { Body, Controller, Post } from "@nestjs/common";
import { ZplService } from "./zpl.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { PrintZplDto } from "./print-zpl-dto";

@ApiTags("ZPL")
@Controller("zpl")
export class ZplController {
  constructor(private zplService: ZplService) {}
  @ApiOperation({ summary: "Отправить ZPL на принтер" })
  @Post("/")
  zplPrint(@Body() dto: PrintZplDto) {
    return this.zplService.printZPLData(dto);
  }
}
