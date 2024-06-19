import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DocsService } from "./docs.service";
import Doc from "./docs.model";
import { CreateDocDto } from "./dto/create-doc.dto";

@ApiTags("Сводки")
@Controller("docs")
export class DocsController {
  constructor(private docsService: DocsService) { }

  @ApiOperation({ summary: "Получить все сводки" })
  @ApiResponse({ status: 200, type: [Doc] })
  @Get()
  getAll() {
    // return this.docsService.getAllDocs();
    return this.docsService.getAllDocs();
  }

  @ApiOperation({ summary: "Получить текущую сводку" })
  @ApiResponse({ status: 200, type: [Doc] })
  @Get("/:plantId")
  getCurrentDoc(@Param("plantId") plantId: string) {
    return this.docsService.getCurrentDoc(plantId);
  }

  @ApiOperation({ summary: "Создание новой сводки" })
  @ApiResponse({ status: 201, type: Doc })
  @ApiBadRequestResponse({ description: "Сводка на эту площадку и дату уже существует" })
  //   @ApiResponse({ status: 400, type: Error })
  @Post()
  create(@Body() dto: CreateDocDto) {
    return this.docsService.createDoc(dto);
  }
}
