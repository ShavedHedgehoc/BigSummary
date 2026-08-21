import { Module } from '@nestjs/common';
import { RecordCounterService } from './record-counter.service';

@Module({
  providers: [RecordCounterService],
  exports: [RecordCounterService],
})
export class RecordCounterModule {}
