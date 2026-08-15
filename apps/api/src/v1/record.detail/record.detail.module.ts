import { Module } from "@nestjs/common";
import { RecordDetailService } from "./record.detail.service";
import { RecordDetailController } from "./record.detail.controller";
import { HistoriesModule } from "src/v1/histories/histories.module";
import { RecordsModule } from "src/v1/records/records.module";

@Module({
  providers: [RecordDetailService],
  controllers: [RecordDetailController],
  imports: [HistoriesModule, RecordsModule],
})
export class RecordDetailModule { }
