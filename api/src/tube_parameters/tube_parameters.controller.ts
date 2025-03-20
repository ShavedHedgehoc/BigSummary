import { Controller, Get, Param } from "@nestjs/common";
import { TubeParametersService } from "./tube_parameters.service";

@Controller("tube-parameters")
export class TubeParametersController {
  constructor(private tubeParametersService: TubeParametersService) {}
  @Get("/:record_id")
  getParameterByREcId(@Param("record_id") record_id: number) {
    return this.tubeParametersService.getTubeParameterByRecId(record_id);
  }
}
