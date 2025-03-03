import { Controller, Get } from "@nestjs/common";
import { TracePlantsService } from "./trace_plants.service";

@Controller("trace-plants")
export class TracePlantsController {
  constructor(private tracePlantsService: TracePlantsService) {}
  @Get()
  getAllPlants() {
    return this.tracePlantsService.getPlants();
  }
}
