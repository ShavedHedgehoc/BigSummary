import { Module } from '@nestjs/common';
import { RecordCommonService } from './record.common.service';

@Module({
  providers: [RecordCommonService],
  exports: [RecordCommonService],
})
export class RecordModule {}
