import { Controller, Get, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { OperationsService } from "./operations.service";

@ApiTags("Операции")
@Controller("operations")
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Get("/extrusion")
  @ApiOperation({ summary: "Получить операции поста 1" })
  @ApiQuery({ name: "rank", required: false, type: String })
  getExtrusionOperations(@Query("rank") rank?: string) {
    return this.operationsService.getExtrusionOperations(Number(rank));
  }
  @Get("/varnish")
  @ApiOperation({ summary: "Получить операции поста 2" })
  @ApiQuery({ name: "rank", required: false, type: String })
  getVarnishOperations(@Query("rank") rank?: string) {
    return this.operationsService.getVarnishOperations(Number(rank));
  }
  @Get("/offset")
  @ApiOperation({ summary: "Получить операции поста 3" })
  @ApiQuery({ name: "rank", required: false, type: String })
  getOffsetOperations(@Query("rank") rank?: string) {
    return this.operationsService.getOffsetOperations(Number(rank));
  }
  @Get("/sealant")
  @ApiOperation({ summary: "Получить операции поста 4" })
  @ApiQuery({ name: "rank", required: false, type: String })
  getSealantOperations(@Query("rank") rank?: string) {
    return this.operationsService.getSealantOperations(Number(rank));
  }
}
