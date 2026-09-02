import { Module } from '@nestjs/common';
import { HistoryCommonService } from './history.common.service';
import { WorkstationHistoryService } from './workstation.history.service';
import { RecordModule } from '../record/record.module';

@Module({
  imports: [RecordModule],
  providers: [HistoryCommonService, WorkstationHistoryService],
  exports: [HistoryCommonService, WorkstationHistoryService],
})
export class HistoryModule {}
