import { Module } from '@nestjs/common';
import { ApplicationTraceBoilService } from './application.boil.service';

@Module({
  providers: [ApplicationTraceBoilService],
  exports: [ApplicationTraceBoilService],
})
export class TraceBoilModule {}
