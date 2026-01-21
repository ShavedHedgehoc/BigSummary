import { Body, Controller, Get, Post, Query, ValidationPipe } from "@nestjs/common";
import { TresholdsService } from "./tresholds.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetTresholdsListDto } from "./dto/get-tresholds-list.dto";
import { CreateExtrusionTresholdDto } from "./dto/create-extrusion-treshold.dto";
import { CreateVarnishTresholdDto } from "./dto/create-varnish-treshold.dto";
import { CreateOffsetTresholdDto } from "./dto/create-offset-treshold.dto";
import { CreateSealantTresholdDto } from "./dto/create-sealant-treshold.dto";

@ApiTags("Границы параметров")
@Controller("tresholds")
export class TresholdsController {
  constructor(private readonly tresholdsService: TresholdsService) {}

  @ApiOperation({ summary: "Получить внесенные границы поста 1" })
  @Get("/extrusion")
  getExtrusionTresholdsList(@Query(new ValidationPipe({ transform: true })) query: GetTresholdsListDto) {
    return this.tresholdsService.getExtrusionTresholdsList(query);
  }

  @ApiOperation({ summary: "Получить внесенные границы поста 2" })
  @Get("/varnish")
  getVarnishTresholdsList(@Query(new ValidationPipe({ transform: true })) query: GetTresholdsListDto) {
    return this.tresholdsService.getVarnishTresholdsList(query);
  }

  @ApiOperation({ summary: "Получить внесенные границы поста 3" })
  @Get("/offset")
  getOffsetTresholdsList(@Query(new ValidationPipe({ transform: true })) query: GetTresholdsListDto) {
    return this.tresholdsService.getOffsetTresholdsList(query);
  }

  @ApiOperation({ summary: "Получить внесенные границы поста 4" })
  @Get("/sealant")
  getSealantTresholdsList(@Query(new ValidationPipe({ transform: true })) query: GetTresholdsListDto) {
    return this.tresholdsService.getSealantTresholdsList(query);
  }

  @ApiOperation({ summary: "Создать границы поста 1" })
  @Post("/extrusion")
  createExtrusionTreshold(@Body(new ValidationPipe({ transform: true })) dto: CreateExtrusionTresholdDto) {
    return this.tresholdsService.createExtrusionTreshold(dto);
  }

  @ApiOperation({ summary: "Создать границы поста 2" })
  @Post("/varnish")
  createVarnishTreshold(@Body(new ValidationPipe({ transform: true })) dto: CreateVarnishTresholdDto) {
    return this.tresholdsService.createVarnishTreshold(dto);
  }

  @ApiOperation({ summary: "Создать границы поста 3" })
  @Post("/offset")
  createOffsetTreshold(@Body(new ValidationPipe({ transform: true })) dto: CreateOffsetTresholdDto) {
    return this.tresholdsService.createOffsetTreshold(dto);
  }

  @ApiOperation({ summary: "Создать границы поста 4" })
  @Post("/sealant")
  createSealantTreshold(@Body(new ValidationPipe({ transform: true })) dto: CreateSealantTresholdDto) {
    return this.tresholdsService.createSealantTreshold(dto);
  }
}
