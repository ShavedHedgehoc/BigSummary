import { Module } from '@nestjs/common';
import { ConveyorTasksController } from './conveyor_tasks.controller';
import { ConveyorsModule } from 'src/conveyors/conveyors.module';
import { ConveyorsService } from 'src/conveyors/conveyors.service';
import { RecordsModule } from 'src/records/records.module';

@Module({
  controllers: [ConveyorTasksController],
  imports: [ConveyorsModule],
})
export class ConveyorTasksModule {}
