import { Module } from "@nestjs/common";
import { TraceTrademarksService } from "./trace_trademarks.service";
import { TraceTrademarksController } from "./trace_trademarks.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import TraceTrademark from "src/trace_models/trace_trademark.model";

@Module({
  providers: [TraceTrademarksService],
  controllers: [TraceTrademarksController],
  imports: [SequelizeModule.forFeature([TraceTrademark], "trace_connection")],
  exports: [TraceTrademarksService],
})
export class TraceTrademarksModule {}
