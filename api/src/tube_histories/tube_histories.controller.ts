import { Body, Controller, Post } from "@nestjs/common";
import { GetLastHistoryDto } from "./dto/get-last-history.dto";
import { TubeHistoriesService } from "./tube_histories.service";
import { CreateTubeHistoryDto } from "./dto/create-tube-history.dto";

@Controller("tube-histories")
export class TubeHistoriesController {
  constructor(private tubeHistoriesService: TubeHistoriesService) {}

  @Post("/last_history")
  getLastHistoryByConveyorName(@Body() dto: GetLastHistoryDto) {
    return this.tubeHistoriesService.getLastHistoryByConveyorName(dto);
  }

  @Post("/create")
  createTubeHistory(@Body() dto: CreateTubeHistoryDto) {
    return this.tubeHistoriesService.createHistory(dto);
  }
}
