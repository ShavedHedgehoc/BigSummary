import { Controller, Get, Query } from '@nestjs/common';
import { ConveyorTasksService } from './conveyor_tasks.service';

@Controller('conveyor-tasks')
export class ConveyorTasksController {
  constructor(private readonly conveyorTasksService: ConveyorTasksService) {}

  @Get()
  getTasks(@Query('conveyor') conveyor: string) {
    return this.conveyorTasksService.getTasks(conveyor);
  }

  @Get('/by_barcode')
  getTasksByBarcode(@Query('barcode') barcode: string) {
    return this.conveyorTasksService.getTasksByBarcode(barcode);
  }
}
