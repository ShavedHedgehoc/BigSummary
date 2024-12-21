import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DocsService } from "./docs.service";
import Doc from "./docs.model";
import { CreateDocDto } from "./dto/create-doc.dto";
import { GetDocsDto } from "./dto/get-docs.dto";

@ApiTags("Сводки")
@Controller("docs")
export class DocsController {
  constructor(private docsService: DocsService) {}

  @ApiOperation({ summary: "Получить все сводки" })
  @ApiResponse({ status: 200, type: [Doc] })
  @Get()
  getAll() {
    // return this.docsService.getAllDocs();
    return this.docsService.getAllDocs();
  }

  @ApiOperation({ summary: "Удалить сводку по id" })
  @ApiResponse({ status: 201 })
  @Delete("/:id")
  getCurrentDoc(@Param("id") id: string) {
    return this.docsService.deleteDoc(Number(id));
  }

  @ApiOperation({ summary: "Получить все документы с параметрами" })
  @Post("/get_all")
  getAllWithParams(@Body() dto: GetDocsDto) {
    return this.docsService.getAllDocsWithFilter(dto);
  }

  // @ApiOperation({ summary: "Получить сводку по id" })
  // @ApiResponse({ status: 200, type: [Doc] })
  // @Get("/doc/:docId")
  // getDocByid(@Param("docId") docId: string) {
  //   return this.docsService.getDocByid(docId);
  // }

  @ApiOperation({ summary: "Создание новой сводки" })
  @ApiResponse({ status: 201, type: Doc })
  @ApiBadRequestResponse({ description: "Сводка на эту площадку и дату уже существует" })
  //   @ApiResponse({ status: 400, type: Error })
  @Post()
  create(@Body() dto: CreateDocDto) {
    return this.docsService.createDoc(dto);
  }
}
