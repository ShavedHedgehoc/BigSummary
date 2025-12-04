import { Body, Controller, Post } from "@nestjs/common";
import { StatusesService } from "./statuses.service";
import { ApiOperation } from "@nestjs/swagger";
import { CreateStatusDto } from "./dto/create-status.dto";

@Controller("statuses")
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @ApiOperation({ summary: "Создать запись статуса поста 1" })
  @Post("extrusion")
  createExtrusionStatusEntry(@Body() dto: CreateStatusDto) {
    return this.statusesService.createExtrusionStatus(dto);
  }

  @ApiOperation({ summary: "Создать запись параметров поста 2" })
  @Post("varnish")
  createVarnishStatusEntry(@Body() dto: CreateStatusDto) {
    return this.statusesService.createVarnishStatus(dto);
  }

  @ApiOperation({ summary: "Создать запись параметров поста 3" })
  @Post("offset")
  createOffsetStatusEntry(@Body() dto: CreateStatusDto) {
    return this.statusesService.createOffsetStatus(dto);
  }

  @ApiOperation({ summary: "Создать запись параметров поста 4" })
  @Post("sealant")
  createSealantStatusEntry(@Body() dto: CreateStatusDto) {
    return this.statusesService.createSealantStatus(dto);
  }
}
