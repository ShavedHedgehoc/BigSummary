import { Controller, Get, Query } from '@nestjs/common';
import { ConveyorsService } from 'src/conveyors/conveyors.service';

@Controller('conveyor-tasks')
export class ConveyorTasksController {
  constructor(private readonly conveyorService: ConveyorsService) {}

  @Get()
  getTasks(@Query('conveyor') conveyor: string) {
    return this.conveyorService.getTasks(conveyor);
  }

  @Get('/by_barcode')
  getTasksByBarcode(@Query('barcode') barcode: string) {
    return this.conveyorService.getTasksByBarcode(barcode);
  }
}
