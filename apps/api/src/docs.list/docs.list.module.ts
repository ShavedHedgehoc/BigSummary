import { Module } from "@nestjs/common";
import { DocsListController } from "./docs.list.controller";
import { DocsListService } from "./docs.list.service";
import { RecordsModule } from "src/records/records.module";
import { DocsModule } from "src/docs/docs.module";
import { HistoriesModule } from "src/histories/histories.module";

@Module({
  controllers: [DocsListController],
  providers: [DocsListService],
  imports: [RecordsModule, DocsModule, HistoriesModule],
})
export class DocsListModule {}
