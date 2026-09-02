import { Module } from '@nestjs/common';
import { ConveyorTasksController } from './conveyor_tasks.controller';
import { ConveyorTasksService } from './conveyor_tasks.service';

@Module({
  providers: [ConveyorTasksService],
  controllers: [ConveyorTasksController],
  exports: [ConveyorTasksService],
})
export class ConveyorTasksModule {}
