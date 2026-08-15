import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConveyorsModule } from './conveyors/conveyors.module';
import { ConveyorTasksModule } from './conveyor_tasks/conveyor_tasks.module';
import { ProcessCounterModule } from './process_counter/process_counter.module';
import { CountersModule } from './counters/counters.module';

@Module({
  imports: [PrismaModule, ConveyorsModule, ConveyorTasksModule, ProcessCounterModule, CountersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
