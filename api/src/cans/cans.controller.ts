import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateCanDto } from "./dto/create-can.dto";
import Can from "./cans.model";
import { CansService } from "./cans.service";

@ApiTags("Емкости")
@Controller("cans")
export class CansController {
  constructor(private cansService: CansService) {}

  @ApiOperation({ summary: "Получить все емкости" })
  @ApiResponse({ status: 200, type: [Can] })
  @Get()
  getAll() {
    return this.cansService.getAllCans();
  }

  @ApiOperation({ summary: "Создание новой емкости" })
  @ApiResponse({ status: 201, type: Can })

  //   @ApiResponse({ status: 400, type: Error })
  @Post()
  create(@Body() dto: CreateCanDto) {
    return this.cansService.createCan(dto);
  }
}
