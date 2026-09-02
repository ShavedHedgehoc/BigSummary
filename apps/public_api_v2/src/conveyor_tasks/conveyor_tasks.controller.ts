import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ConveyorTasksService } from './conveyor_tasks.service';
import {
  publicApiConveyorTaskListItemSchema,
  TPublicApiConveyorTaskListResponse,
} from '@repo/schemas';
import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const swaggerCompatibleSchema = publicApiConveyorTaskListItemSchema.extend({
  date: z.string().datetime({ message: 'Дата задачи' }),
});

class PublicApiConveyorTaskListItemDto extends createZodDto(swaggerCompatibleSchema) {}

@Controller('conveyor-tasks')
export class ConveyorTasksController {
  constructor(private readonly conveyorTasksService: ConveyorTasksService) {}

  @Get()
  @ApiOperation({ summary: 'Получить задачи конвейеров' })
  @ApiQuery({
    name: 'conveyor',
    required: false,
    type: String,
    description: 'Наименование конвейера',
  })
  @ApiQuery({ name: 'record_id', required: false, type: Number, description: 'id записи' })
  @ApiQuery({ name: 'barcode', required: false, type: String, description: 'Штрихкод конвейера' })
  @ApiQuery({
    name: 'allRecords',
    required: false,
    type: Boolean,
    description: 'Отдать все записи',
  })
  @ApiOkResponse({
    description: 'Список задач',
    type: PublicApiConveyorTaskListItemDto,
    isArray: true,
  })
  getTasks(
    @Query('conveyor') conveyor?: string,
    // @Query('record_id') record_id?: number,
    @Query('record_id', new ParseIntPipe({ optional: true })) record_id?: number,
    @Query('barcode') barcode?: string,
    @Query('allRecords') allRecords?: boolean,
  ): Promise<TPublicApiConveyorTaskListResponse> {
    return this.conveyorTasksService.getTasks({
      conveyor: conveyor,
      record_id: record_id,
      barcode: barcode,
      allRecords: allRecords,
    });
  }
}
