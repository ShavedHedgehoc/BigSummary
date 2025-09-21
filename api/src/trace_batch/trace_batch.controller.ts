import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TraceBatchService } from "./trace_batch.service";
import { ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiTags } from "@nestjs/swagger";
import { GetTraceBatchsDto } from "./dto/get-trace-batchs.dto";
import { GetTraceBatchsWghtReportDto } from "./dto/get-trace-batchs-wght-report.dto";
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

  @ApiOperation({ summary: "Получить варки по id" })
  @Get("/detail/:id")
  getBatchВфефByid(@Param("id") id: string) {
    return this.traceBatchService.getBatchData(Number(id));
  }
}
