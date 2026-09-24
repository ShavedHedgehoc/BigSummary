import { Module } from '@nestjs/common';
import { HistoryCommonService } from './history.common.service';
import { WorkstationHistoryService } from './workstation.history.service';
import { RecordModule } from '../record/record.module';
import { ApplicationHistoryService } from './application.history.service';

@Module({
  imports: [RecordModule],
  providers: [HistoryCommonService, WorkstationHistoryService, ApplicationHistoryService],
  exports: [HistoryCommonService, WorkstationHistoryService, ApplicationHistoryService],
})
export class HistoryModule {}
