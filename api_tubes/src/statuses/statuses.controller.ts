import { Body, Controller, Post } from "@nestjs/common";
import { StatusesService } from "./statuses.service";
import { ApiOperation } from "@nestjs/swagger";
import { CreateStatusDto } from "./dto/create-status.dto";

@Controller("statuses")
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}
  @ApiOperation({ summary: "Создать запись статуса поста 1" })
  @Post("extrusion")
  createExtrusionParamsEntry(@Body() dto: CreateStatusDto) {
    return this.statusesService.createExtrusionStatus(dto);
  }

  //   @ApiOperation({ summary: "Создать запись параметров поста 2" })
  //     @Post("varnish")
  //     createVarnishParamsEntry(@Body() dto: CreateVarnishEntryDto) {
  //       return this.paramsService.createVarnishEntry(dto);
  //     }
  //     @ApiOperation({ summary: "Создать запись параметров поста 3" })
  //     @Post("offset")
  //     createOffsetParamsEntry(@Body() dto: CreateOffsetEntryDto) {
  //       return this.paramsService.createOffsetEntry(dto);
  //     }
  //     @ApiOperation({ summary: "Создать запись параметров поста 4" })
  //     @Post("sealant")
  //     createSealantParamsEntry(@Body() dto: CreateSealantEntryDto) {
  //       return this.paramsService.createSealantEntry(dto);
  //     }
}
