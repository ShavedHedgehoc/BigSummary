import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ConveyorsService } from 'src/conveyors/conveyors.service';

@Controller('conveyor-tasks')
export class ConveyorTasksController {
  constructor(private readonly conveyorService: ConveyorsService) {}

  @Get()
  @ApiOperation({ summary: 'Получить задачи конвейеров' })
  @ApiQuery({ name: 'conveyor', required: false, type: String })
  @ApiQuery({ name: 'record_id', required: false, type: Number })
  @ApiQuery({ name: 'barcode', required: false, type: String })
  getTasks(
    @Query('conveyor') conveyor?: string,
    @Query('record_id') record_id?: number,
    @Query('barcode') barcode?: string,
  ) {
    return this.conveyorService.getTasks({ conveyor: conveyor, record_id: record_id, barcode: barcode });
  }

  // @Get('/by_barcode')
  // getTasksByBarcode(@Query('barcode') barcode: string) {
  //   return this.conveyorService.getTasksByBarcode(barcode);
  // }
}
