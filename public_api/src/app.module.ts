import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConveyorsModule } from './conveyors/conveyors.module';
import { ConveyorTasksModule } from './conveyor_tasks/conveyor_tasks.module';

@Module({
  imports: [PrismaModule, ConveyorsModule, ConveyorTasksModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
