import { Module } from '@nestjs/common';
import { CountersService } from './counters.service';
import { CountersController } from './counters.controller';

@Module({
  providers: [CountersService],
  controllers: [CountersController],
  exports: [CountersService],
})
export class CountersModule {}
