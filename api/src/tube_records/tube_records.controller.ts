import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TubeRecordsService } from "./tube_records.service";
import { GetActiveRecordsDto } from "./dto/get-active-records.dto";
import { SetActiveRecordDto } from "./dto/set-active-record.dto";
import { BulkCreateTubeRecordDto } from "./dto/bulk-create-tube-records.dto";

@Controller("tube-records")
export class TubeRecordsController {
  constructor(private tubeRecordsService: TubeRecordsService) {}

  @Get("/get_active/:conveyor_name")
  getActiveRecordByConveyorName(@Param("conveyor_name") conveyor_name: string) {
    return this.tubeRecordsService.getActiveRecord(conveyor_name);
  }

  @Post("/active")
  getLastHistoryByConveyorName(@Body() dto: GetActiveRecordsDto) {
    return this.tubeRecordsService.getPlannedRecordsByConveyorName(dto);
  }

  @Post("/set_active")
  setActiveRecordByRecordId(@Body() dto: SetActiveRecordDto) {
    return this.tubeRecordsService.setActiveRecordByRecordId(dto);
  }

  @Post("/upload")
  bulkCreateRecords(@Body() dto: BulkCreateTubeRecordDto) {
    return this.tubeRecordsService.bulkCreateTubeRecords(dto);
  }
}
