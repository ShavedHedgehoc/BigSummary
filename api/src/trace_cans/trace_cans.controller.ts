import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TraceCansService } from "./trace_cans.service";
import { GetCansListDto } from "./dto/get-cans-list.dto";
import { GetCansDto } from "./dto/get-cans.dto";

@Controller("trace-cans")
export class TraceCansController {
  constructor(private cansService: TraceCansService) {}

  @Get()
  getCans() {
    return this.cansService.getCans();
  }

  @Get("/volumes")
  getCanVolumes() {
    return this.cansService.getVolumes();
  }

  @Post()
  getCansWithParams(@Body() dto: GetCansDto) {
    return this.cansService.getCansWithParams(dto);
  }

  @Post("/list")
  getCansList(@Body() dto: GetCansListDto) {
    return this.cansService.getCansList(dto);
  }
}
