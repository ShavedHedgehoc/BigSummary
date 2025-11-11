import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ExtrusionService } from "./extrusion.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import CreateExtrusionHardwareParamsRecordDto from "./dto/create-extrusion-hardware-params-record.dto";

@ApiTags("Пост 1.Экструзия и токарная обработка")
@Controller("extrusion")
export class ExtrusionController {
  constructor(private readonly extrusionService: ExtrusionService) {}

  @ApiOperation({ summary: "Создать запись границ параметров работы оборудования" })
  @Post("create_trehsholds")
  createExtrusionHardwareTresholdsRecord(@Body() dto: any) {
    return null;
  }

  @ApiOperation({ summary: "Получить границы параметры работы оборудования по id продукции" })
  @Get("get_trehsholds/:product_id")
  getExtrusionHardwareTresholdsByProductionId(@Param("product_id") product_id: string) {
    return this.extrusionService.getExtrusionHardwareTresholdsByProductionId(Number(product_id));
  }

  @ApiOperation({ summary: "Получить текущие параметры работы оборудования по id сводки" })
  @Get("get_params/:summary_id")
  getExtrusionHardwareCurrentParamsBySummaryId(@Param("summary_id") summary_id: string) {
    return this.extrusionService.getExtrusionHardwareCurrentParamsBySummaryId(Number(summary_id));
  }

  @ApiOperation({ summary: "Создать запись заданных параметров работы оборудования" })
  @Post("create_params_record")
  createExtrusionHardwareParamsRecord(@Body() dto: CreateExtrusionHardwareParamsRecordDto) {
    return this.extrusionService.createExtrusionHardwareParamsRecord(dto);
  }
}
