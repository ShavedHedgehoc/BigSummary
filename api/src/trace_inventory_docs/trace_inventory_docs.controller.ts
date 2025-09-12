import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { TraceInventoryDocsService } from "./trace_inventory_docs.service";
import { GetInventoryDocsDto } from "./dto/get-inventory-docs.dto";

@ApiTags("Документы инвентаризации на варочном")
@Controller("trace-inventory-docs")
export class TraceInventoryDocsController {
  constructor(private traceInventoryDocsService: TraceInventoryDocsService) {}

  @ApiOperation({ summary: "Получить документы инвентаризаций с фильтром" })
  @Post("/get-inventories")
  getInventories(@Body() dto: GetInventoryDocsDto) {
    return this.traceInventoryDocsService.getInventoryDocs(dto);
  }

  @ApiOperation({ summary: "Получить документ по id" })
  @Get("/:inventory_id")
  getInventoryByid(@Param("inventory_id") inventory_id: string) {
    return this.traceInventoryDocsService.getInventoryById(Number(inventory_id));
  }
}
