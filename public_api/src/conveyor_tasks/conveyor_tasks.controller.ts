import { Body, Controller, Post } from '@nestjs/common';
import { ConveyorTasksService } from './conveyor_tasks.service';
import { GetConveyorTasksDto } from './dto/get-conveyor-tasks.dto';

@Controller('conveyor-tasks')
export class ConveyorTasksController {
  constructor(private readonly conveyorTasksService: ConveyorTasksService) {}
  @Post()
  getTasks(@Body() dto: GetConveyorTasksDto) {
    return this.conveyorTasksService.getTasks(dto);
  }
}
