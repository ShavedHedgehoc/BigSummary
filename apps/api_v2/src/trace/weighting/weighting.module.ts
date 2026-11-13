import { Module } from '@nestjs/common';
import { ApplicationTraceWeightingService } from './application.weighting.service';

@Module({
  providers: [ApplicationTraceWeightingService],
  exports: [ApplicationTraceWeightingService],
})
export class TraceWeightingModule {}
