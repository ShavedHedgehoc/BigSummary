import { Module } from "@nestjs/common";
import { DocDetailService } from "./doc.detail.service";
import { DocDetailController } from "./doc.detail.controller";
import { DocsService } from "src/docs/docs.service";
import { DocsModule } from "src/docs/docs.module";
import { RecordsModule } from "src/records/records.module";
import { HistoriesModule } from "src/histories/histories.module";
import { SemiProductsModule } from "src/semi_products/semi_products.module";
import { RecordRegulationsModule } from "src/record_regulations/record_regulations.module";
import { RecordCountersModule } from "src/record_counters/record_counters.module";

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
export class DocDetailModule {}
