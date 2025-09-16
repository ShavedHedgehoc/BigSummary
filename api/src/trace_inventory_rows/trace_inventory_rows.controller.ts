import { Body, Controller, Post } from "@nestjs/common";
import { TraceInventoryRowsService } from "./trace_inventory_rows.service";
import { GetInventoryRowsByIdWithFilterDto } from "./dto/get-inventory-rows-by-id-with-filter.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Строки переучета")
@Controller("trace-inventory-rows")
export class TraceInventoryRowsController {
  constructor(private inventoryRowsService: TraceInventoryRowsService) {}
  @ApiOperation({ summary: "Получить строки переучета по id документа" })
  @Post()
  getInventoryRowsByIdWithFilter(@Body() dto: GetInventoryRowsByIdWithFilterDto) {
    return this.inventoryRowsService.getInventoryByIdWithFilter(dto);
  }
}
