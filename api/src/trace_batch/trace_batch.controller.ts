import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { TraceBatchService } from "./trace_batch.service";
import { ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiTags, ApiResponse } from "@nestjs/swagger";
import { GetTraceBatchsDto } from "./dto/get-trace-batchs.dto";
import { GetTraceBatchsWghtReportDto } from "./dto/get-trace-batchs-wght-report.dto";
import { GetTraceBatchsWghtReportDetailDto } from "./dto/get-batchs-wght-report-detail.dto";
import { GetWeightingsSummaryDto } from "./dto/get-weightings-summary.dto";
import { GetWeightingsSummaryDetailDto } from "./dto/get-weightings-summary-detail.dto";
@ApiTags("Варки (для теста)")
@Controller("trace-batch")
export class TraceBatchController {
  constructor(private traceBatchService: TraceBatchService) {}
  @ApiOperation({ summary: "Получить партию из прослеживаемости по имени" })
  @ApiOkResponse({
    description: "Партия варки, полученная по имени",
    schema: {
      properties: {
        BatchPK: {
          description: "id варки",
          example: 180547,
          type: "number",
        },
        BatchName: {
          description: "Партия варки",
          example: "93A3",
          type: "string",
        },
        BatchDate: {
          description: "Дата варки",
          example: "2023-01-10T00:00:00.000Z",
          type: "date",
        },
        Plant: {
          description: "Первая буква площадки",
          example: "К",
          type: "string",
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: "Партия не найдена",
  })
  @Get("/:batchName")
  getTraceBatchByName(@Param("batchName") batchName: string) {
    return this.traceBatchService.getByName(batchName);
  }

  @ApiOperation({ summary: "Получить партию из прослеживаемости по id" })
  @Get("/by_id/:id")
  getTraceBatchByid(@Param("id") id: string) {
    return this.traceBatchService.getById(Number(id));
  }

  @ApiOperation({ summary: "Получить варки с фильтром" })
  @Post("/")
  getBatchesWithFilter(@Body() dto: GetTraceBatchsDto) {
    return this.traceBatchService.getBatchs(dto);
  }

  @ApiOperation({ summary: "Отчет по взвешиваниям" })
  @Post("/wght-report")
  getWghtReport(@Body() dto: GetTraceBatchsWghtReportDto) {
    return this.traceBatchService.getBatchsWghtReport(dto);
  }

  @ApiOperation({ summary: "Отчет по взвешиваниям, детально по варке и продукту" })
  @Post("/wght-report-detail")
  getWghtReportDetail(@Body() dto: GetTraceBatchsWghtReportDetailDto) {
    return this.traceBatchService.getBatchsWghtReportDetail(dto);
  }

  @ApiOperation({ summary: "Получить варки по id" })
  @Get("/detail/:id")
  getBatchВфефByid(@Param("id") id: string) {
    return this.traceBatchService.getBatchData(Number(id));
  }

  @ApiOperation({ summary: "Удалить взвешивания по id контейнера" })
  @ApiResponse({ status: 201 })
  @Delete("/delete_by_container/:id")
  deleteConveyorById(@Param("id") id: string) {
    return this.traceBatchService.deleteWeightingsByContainerId(Number(id));
  }

  @ApiOperation({ summary: "Получить сводку по весовому участку" })
  @Post("/weightings_department_summary")
  getWeightingDepartmentSummary(@Body() dto: GetWeightingsSummaryDto) {
    return this.traceBatchService.getWeightingDepartmentSummary(dto);
  }

  @ApiOperation({ summary: "Получить детальную сводку по весовому участку" })
  @Post("/weightings_department_summary_detail")
  getWeightingDepartmentSummaryDetail(@Body() dto: GetWeightingsSummaryDetailDto) {
    return this.traceBatchService.getWeightingsDepartmentsSummaryDetail(dto);
  }
}
