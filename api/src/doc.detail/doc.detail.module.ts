import { Module } from "@nestjs/common";
import { DocDetailService } from "./doc.detail.service";
import { DocDetailController } from "./doc.detail.controller";
import { DocsService } from "src/docs/docs.service";
import { DocsModule } from "src/docs/docs.module";
import { RecordsModule } from "src/records/records.module";
import { HistoriesModule } from "src/histories/histories.module";

@Module({
  providers: [DocDetailService],
  controllers: [DocDetailController],
  imports: [DocsModule, RecordsModule, HistoriesModule],
})
export class DocDetailModule {}
