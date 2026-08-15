import { Module } from '@nestjs/common';
import { ProcessCounterService } from './process_counter.service';
import { ProcessCounterController } from './process_counter.controller';

@Module({
  providers: [ProcessCounterService],
  controllers: [ProcessCounterController]
})
export class ProcessCounterModule {}
