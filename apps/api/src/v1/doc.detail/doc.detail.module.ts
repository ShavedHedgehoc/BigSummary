import { Module } from "@nestjs/common";
import { DocDetailService } from "./doc.detail.service";
import { DocDetailController } from "./doc.detail.controller";
import { DocsService } from "src/v1/docs/docs.service";
import { DocsModule } from "src/v1/docs/docs.module";
import { RecordsModule } from "src/v1/records/records.module";
import { HistoriesModule } from "src/v1/histories/histories.module";
import { SemiProductsModule } from "src/v1/semi_products/semi_products.module";
import { RecordRegulationsModule } from "src/v1/record_regulations/record_regulations.module";
import { RecordCountersModule } from "src/v1/record_counters/record_counters.module";

@Module({
  providers: [DocDetailService],
  controllers: [DocDetailController],
  imports: [
    DocsModule,
    RecordsModule,
    HistoriesModule,
    SemiProductsModule,
    RecordRegulationsModule,
    RecordCountersModule,
  ],
})
export class DocDetailModule { }
