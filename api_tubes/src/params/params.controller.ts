import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ParamsService } from "./params.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateExtrusionEntryDto } from "./dto/create-extrusion-entry.dto";
import { CreateVarnishEntryDto } from "./dto/create-varnish-entry.dto";
import { CreateOffsetEntryDto } from "./dto/create-offset-entry.dto";
import { CreateSealantEntryDto } from "./dto/create-sealant-entry.dto";

@ApiTags("Параметры")
@Controller("params")
export class ParamsController {
  constructor(private readonly paramsService: ParamsService) {}

  @ApiOperation({ summary: "Создать запись параметров поста 1" })
  @Post("extrusion")
  createExtrusionParamsEntry(@Body() dto: CreateExtrusionEntryDto) {
    return this.paramsService.createExtrusionEntry(dto);
  }
  @ApiOperation({ summary: "Создать запись параметров поста 2" })
  @Post("varnish")
  createVarnishParamsEntry(@Body() dto: CreateVarnishEntryDto) {
    return this.paramsService.createVarnishEntry(dto);
  }
  @ApiOperation({ summary: "Создать запись параметров поста 3" })
  @Post("offset")
  createOffsetParamsEntry(@Body() dto: CreateOffsetEntryDto) {
    return this.paramsService.createOffsetEntry(dto);
  }
  @ApiOperation({ summary: "Создать запись параметров поста 4" })
  @Post("sealant")
  createSealantParamsEntry(@Body() dto: CreateSealantEntryDto) {
    return this.paramsService.createSealantEntry(dto);
  }
}
