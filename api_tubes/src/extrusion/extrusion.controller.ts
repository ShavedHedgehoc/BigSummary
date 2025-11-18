import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ExtrusionService } from "./extrusion.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateExtrusionEntryDto } from "./dto/create-extrusion-entry.dto";
// import CreateExtrusionHardwareParamsRecordDto from "./dto/create-extrusion-hardware-params-record.dto";
// import CreateExtrusionQualityControlParamsRecordDto from "./dto/create-extrusion-quality-control-params-record.dto";

@ApiTags("Пост 1.Экструзия и токарная обработка")
@Controller("extrusion")
export class ExtrusionController {
  constructor(private readonly extrusionService: ExtrusionService) {}

  @ApiOperation({ summary: "Создать запись параметров" })
  @Post("params")
  createExtrusionParamsEntry(@Body() dto: CreateExtrusionEntryDto) {
    return this.extrusionService.createExtrusionParamsEntry(dto);
  }

  // @ApiOperation({ summary: "Получить границы параметров работы оборудования по id продукции" })
  // @Get("hardware/get_trehsholds/:product_id")
  // getExtrusionHardwareTresholdsByProductionId(@Param("product_id") product_id: string) {
  //   return this.extrusionService.getExtrusionHardwareTresholdsByProductionId(Number(product_id));
  // }

  // @ApiOperation({ summary: "Получить последнюю запись параметров работы оборудования по id сводки" })
  // @Get("hardware/get_params/:summary_id")
  // getExtrusionHardwareCurrentParamsBySummaryId(@Param("summary_id") summary_id: string) {
  //   return this.extrusionService.getExtrusionHardwareCurrentParamsBySummaryId(Number(summary_id));
  // }

  // @ApiOperation({ summary: "Получить все записи параметров работы оборудования по id сводки" })
  // @Get("hardware/get_all_params/:summary_id")
  // getExtrusionAllHardwareParamsBySummaryId(@Param("summary_id") summary_id: string) {
  //   return this.extrusionService.getExtrusionAllHardwareParamsBySummaryId(Number(summary_id));
  // }

  // @ApiOperation({ summary: "Создать запись параметров работы оборудования" })
  // @Post("hardware/create_params_record")
  // createExtrusionHardwareParamsRecord(@Body() dto: CreateExtrusionHardwareParamsRecordDto) {
  //   return this.extrusionService.createExtrusionHardwareParamsRecord(dto);
  // }

  // // @ApiOperation({ summary: "Создать запись границ параметров работы оборудования" })
  // // @Post("create_trehsholds")
  // // createExtrusionHardwareTresholdsRecord(@Body() dto: any) {
  // //   return null;
  // // }

  // //
  // @ApiOperation({ summary: "Получить границы показателей входного контроля по id продукции" })
  // @Get("quality_control/get_trehsholds/:product_id")
  // getExtrusionQualityControlTresholdsByProductionId(@Param("product_id") product_id: string) {
  //   return this.extrusionService.getExtrusionQualityControlTresholdsByProductionId(Number(product_id));
  // }

  // @ApiOperation({ summary: "Получить последнюю запись входного контроля по id сводки" })
  // @Get("quality_control/get_params/:summary_id")
  // getExtrusionCurrentQualityControlParamsBySummaryId(@Param("summary_id") summary_id: string) {
  //   return this.extrusionService.getExtrusionQualityControlCurrentParamsBySummaryId(Number(summary_id));
  // }

  // @ApiOperation({ summary: "Получить все записи входного контроля по id сводки" })
  // @Get("quality_control/get_all_params/:summary_id")
  // getExtrusionAllQualityControlParamsBySummaryId(@Param("summary_id") summary_id: string) {
  //   return this.extrusionService.getExtrusionAllQualityControlParamsBySummaryId(Number(summary_id));
  // }

  // @ApiOperation({ summary: "Создать запись входного контроля" })
  // @Post("quality_control/create_params_record")
  // createExtrusionQualityControlParamsRecord(@Body() dto: CreateExtrusionQualityControlParamsRecordDto) {
  //   return this.extrusionService.createExtrusionQualityControlParamsRecord(dto);
  // }
}
