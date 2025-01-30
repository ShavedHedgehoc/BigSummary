import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RegulationsService } from "./regulations.service";
import { BulkUpdateRegulationsDto } from "./dto/bulk-update-regulation.dto";
import Regulation from "./regulations.model";

@ApiTags("Регламент")
@Controller("regulations")
export class RegulationsController {
  constructor(private regulationsService: RegulationsService) {}

  @ApiOperation({ summary: "Создание нового документа сводки" })
  @ApiResponse({ status: 201 })
  @Post("/bulkupsert")
  bulkUpsert(@Body() dto: BulkUpdateRegulationsDto[]) {
    return this.regulationsService.bulkUpdateRegulations(dto);
  }

  @ApiOperation({ summary: "Получить строку регламента с деталями по id продукта" })
  @ApiResponse({ status: 200 })
  @Get("/:id")
  getRecordsById(@Param("id") id: string) {
    return this.regulationsService.getByProductCode(id);
  }
}
