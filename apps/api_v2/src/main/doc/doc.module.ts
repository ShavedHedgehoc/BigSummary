import { Module } from '@nestjs/common';
import { DashDocService } from './dash.doc.service';
import { DocCommonService } from './doc.common.service';
import { RecordModule } from '../record/record.module';
import { HistoryModule } from '../history/history.module';
import { RecordCounterModule } from '../record-counter/records-counter.module';
import { SemiProductModule } from '../semi-product/semi-product.module';
import { RegulationModule } from '../regulation/regulation.module';

@Module({
  imports: [RecordModule, HistoryModule, RecordCounterModule, SemiProductModule, RegulationModule],
  exports: [DashDocService],
  providers: [DashDocService, DocCommonService],
})
export class DocModule { }
