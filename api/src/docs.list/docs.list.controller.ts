import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DocsListService } from "./docs.list.service";

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
}
