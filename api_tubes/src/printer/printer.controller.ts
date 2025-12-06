import { Controller, Get, Query } from "@nestjs/common";
import { PrinterService } from "./printer.service";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Принтеры")
@Controller("printer")
export class PrinterController {
  constructor(private readonly printerService: PrinterService) {}
  @Get()
  @ApiOperation({ summary: "Получить принтер но id конвейера" })
  getIp(@Query("conveyor_id") conveyor_id: string) {
    return this.printerService.getPrinter(Number(conveyor_id));
  }
}
