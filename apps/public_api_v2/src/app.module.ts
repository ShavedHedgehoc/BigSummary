import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ConveyorsModule } from './conveyors/conveyors.module';
import { ConveyorTasksModule } from './conveyor_tasks/conveyor_tasks.module';
import { CountersModule } from './counters/counters.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), '../../', `.${process.env.NODE_ENV}.env`),
    }),
    ConveyorsModule,
    ConveyorTasksModule,
    CountersModule,
  ],
  controllers: [],
})
export class AppModule {}
