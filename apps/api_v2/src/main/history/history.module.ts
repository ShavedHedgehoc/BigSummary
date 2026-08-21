import { Module } from '@nestjs/common';
import { HistoryCommonService } from './history.common.service';

@Module({
  providers: [HistoryCommonService],
  exports: [HistoryCommonService],
})
export class HistoryModule {}
