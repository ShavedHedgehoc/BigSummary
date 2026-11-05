import { Module } from '@nestjs/common';
import { ApplicationTraceInventoryService } from './application.inventory.service';

@Module({
  providers: [ApplicationTraceInventoryService],
  exports: [ApplicationTraceInventoryService],
})
export class TraceInventoryModule {}
