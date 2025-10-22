import { Module } from "@nestjs/common";
import { TraceInventoryDocsService } from "./trace_inventory_docs.service";
import { TraceInventoryDocsController } from "./trace_inventory_docs.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import TraceInventoryDoc from "src/trace_models/trace_inventory_doc.model";

@Module({
  providers: [TraceInventoryDocsService],
  controllers: [TraceInventoryDocsController],
  imports: [SequelizeModule.forFeature([TraceInventoryDoc], "trace_connection")],
  exports: [TraceInventoryDocsService],
})
export class TraceInventoryDocsModule {}
