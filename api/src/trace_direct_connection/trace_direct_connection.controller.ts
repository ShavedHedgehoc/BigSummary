import { Body, Controller, Get, Post } from "@nestjs/common";

import { ApiTags } from "@nestjs/swagger";
import { UploadBoilDto } from "./dto/upload-boil-dto";
import { TraceDirectConnectionService } from "./trace_direct_connection.service";

@ApiTags("Maindb direct connection")
@Controller("trace-direct-connection")
export class TraceDirectConnectionController {
  constructor(private traceDirectConnectionlService: TraceDirectConnectionService) {}
  @Post("/")
  UploadBoil(@Body() dto: UploadBoilDto) {
    return this.traceDirectConnectionlService.execInsertXML(dto);
  }
}
