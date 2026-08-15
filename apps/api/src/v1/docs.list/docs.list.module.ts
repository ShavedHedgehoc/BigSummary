import { Module } from "@nestjs/common";
import { DocsListController } from "./docs.list.controller";
import { DocsListService } from "./docs.list.service";
import { RecordsModule } from "src/v1/records/records.module";
import { DocsModule } from "src/v1/docs/docs.module";
import { HistoriesModule } from "src/v1/histories/histories.module";

@Module({
  controllers: [DocsListController],
  providers: [DocsListService],
  imports: [RecordsModule, DocsModule, HistoriesModule],
})
export class DocsListModule { }
