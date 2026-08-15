import { Module } from "@nestjs/common";
import { TestController } from "./test.controller";
import { TestService } from "./test.service";
import { RecordsModule } from "src/v1/records/records.module";
import { HistoriesModule } from "src/v1/histories/histories.module";

@Module({
  controllers: [TestController],
  providers: [TestService],
  imports: [RecordsModule, HistoriesModule],
  exports: [TestService],
})
export class TestModule { }
