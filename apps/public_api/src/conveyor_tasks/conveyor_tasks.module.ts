import { Module } from '@nestjs/common';
import { ConveyorTasksService } from './conveyor_tasks.service';
import { ConveyorTasksController } from './conveyor_tasks.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ConveyorTasksService],
  controllers: [ConveyorTasksController],
  imports: [PrismaModule],
})
export class ConveyorTasksModule {}
