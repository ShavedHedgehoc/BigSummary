import { Body, Controller, Post } from "@nestjs/common";
import { TubeRecordsService } from "./tube_records.service";
import { GetActiveRecordsDto } from "./dto/get-active-records.dto";

@Controller("tube-records")
export class TubeRecordsController {
  constructor(private tubeRecordsService: TubeRecordsService) {}

  @Post("/active")
  getLastHistoryByConveyorName(@Body() dto: GetActiveRecordsDto) {
    return this.tubeRecordsService.getActiveRecordsByConveyorName(dto);
  }
}
