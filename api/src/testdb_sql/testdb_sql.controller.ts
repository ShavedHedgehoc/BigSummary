import { Body, Controller, Get, Post } from "@nestjs/common";
import { TestdbSqlService } from "./testdb_sql.service";
import { ApiTags } from "@nestjs/swagger";
import { UploadBoilDto } from "./dto/upload-boil-dto";

@ApiTags("Testdb connection test")
@Controller("testdb_sql")
export class TestdbSqlController {
  constructor(private testsqlService: TestdbSqlService) {}
  @Post("/")
  UploadBoil(@Body() dto: UploadBoilDto) {
    return this.testsqlService.execInsertXML(dto);
  }
}
