import { Controller, Get, Param } from "@nestjs/common";
import { TestService } from "./test.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
@ApiTags("Test")
@Controller("test")
export class TestController {
  constructor(private testService: TestService) {}
  @ApiOperation({ summary: "Полчмть детали строки сводки" })
  @Get("/:recordId")
  getRecordDetail(@Param("recordId") recordId: string) {
    return this.testService.getRecordDetail(Number(recordId));
  }
}
