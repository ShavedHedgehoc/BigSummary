import { Body, Controller, Post } from "@nestjs/common";

import { BasesService } from "./bases.service";
import { UpdateBaseDto } from "./dto/update-base.dto";

@Controller("bases")
export class BaseController {
  constructor(private basesService: BasesService) {}

  @Post("/bulkupdate")
  getCurrentDocWithParams(@Body() dto: UpdateBaseDto) {
    return this.basesService.bulkUpdateBases(dto);
  }
}
