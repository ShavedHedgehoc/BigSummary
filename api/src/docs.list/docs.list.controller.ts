import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DocsListService } from "./docs.list.service";
import { GetDocsDto } from "./dto/get-docs.dto";

@ApiTags("Список сводок")
@Controller("docs_list")
export class DocsListController {
  constructor(private docsListService: DocsListService) {}
  @ApiOperation({ summary: "Получить все типы записей" })
  //   @ApiResponse({ status: 200, type: [History] })
  @Get()
  getAll() {
    return this.docsListService.getDocsList();
  }

  @ApiOperation({ summary: "Получить все документы с параметрами" })
  @Post()
  getAllWithParams(@Body() dto: GetDocsDto) {
    return this.docsListService.getDocsListWithFilter(dto);
  }
}
