import { Controller, Get, Param } from "@nestjs/common";
import { TraceBatchService } from "./trace_batch.service";
import { ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiTags } from "@nestjs/swagger";
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
}
