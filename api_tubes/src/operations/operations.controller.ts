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
  @ApiQuery({ name: "id", required: false, type: String })
  getExtrusionOperations(@Query("rank") rank?: string, @Query("id") id?: string) {
    return this.operationsService.getExtrusionOperations({ rank: rank, id: id });
  }
  @Get("/varnish")
  @ApiOperation({ summary: "Получить операции поста 2" })
  @ApiQuery({ name: "rank", required: false, type: String })
  @ApiQuery({ name: "id", required: false, type: String })
  getVarnishOperations(@Query("rank") rank?: string, @Query("id") id?: string) {
    return this.operationsService.getVarnishOperations({ rank: rank, id: id });
  }
  @Get("/offset")
  @ApiOperation({ summary: "Получить операции поста 3" })
  @ApiQuery({ name: "rank", required: false, type: String })
  @ApiQuery({ name: "id", required: false, type: String })
  getOffsetOperations(@Query("rank") rank?: string, @Query("id") id?: string) {
    return this.operationsService.getOffsetOperations({ rank: rank, id: id });
  }
  @Get("/sealant")
  @ApiOperation({ summary: "Получить операции поста 4" })
  @ApiQuery({ name: "rank", required: false, type: String })
  @ApiQuery({ name: "id", required: false, type: String })
  getSealantOperations(@Query("rank") rank?: string, @Query("id") id?: string) {
    return this.operationsService.getSealantOperations({ rank: rank, id: id });
  }
}
