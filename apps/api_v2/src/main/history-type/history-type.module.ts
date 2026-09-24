import { Module } from '@nestjs/common';
import { ApplicationHistoryTypeService } from './application.history-type.service';

@Module({
  providers: [ApplicationHistoryTypeService],
  exports: [ApplicationHistoryTypeService],
})
export class HistoryTypeModule {}
