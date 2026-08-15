import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ConveyorsService } from 'src/conveyors/conveyors.service';
import { TaskRow, TasksResponse } from 'src/conveyors/dto/tasks.response';

@Controller('conveyor-tasks')
export class ConveyorTasksController {
  constructor(private readonly conveyorService: ConveyorsService) { }

  @Get()
  @ApiOperation({ summary: 'Получить задачи конвейеров' })
  @ApiQuery({ name: 'conveyor', required: false, type: String, description: 'Наименование конвейера' })
  @ApiQuery({ name: 'record_id', required: false, type: Number, description: 'id записи' })
  @ApiQuery({ name: 'barcode', required: false, type: String, description: 'Штрихкод конвейера' })
  @ApiQuery({ name: 'allRecords', required: false, type: Boolean, description: 'Отдать все записи' })
  @ApiOkResponse({
    description: 'Список задач',
    type: [TaskRow]
  })
  getTasks(
    @Query('conveyor') conveyor?: string,
    @Query('record_id') record_id?: number,
    @Query('barcode') barcode?: string,
    @Query('allRecords') allRecords?: boolean,
  ): Promise<TasksResponse> {
    return this.conveyorService.getTasks({ conveyor: conveyor, record_id: record_id, barcode: barcode, allRecords: allRecords });
  }
}
