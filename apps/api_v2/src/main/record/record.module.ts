import { Module } from '@nestjs/common';
import { RecordCommonService } from './record.common.service';
import { WorkstationRecordService } from './workstation.record.service';

@Module({
  providers: [RecordCommonService, WorkstationRecordService],
  exports: [RecordCommonService, WorkstationRecordService],
})
export class RecordModule {}
