import { Module } from "@nestjs/common";
import { TraceInventoryRowsService } from "./trace_inventory_rows.service";
import { TraceInventoryRowsController } from "./trace_inventory_rows.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import TraceInventoryRow from "src/trace_models/trace_inventory_row.model";

@Module({
  providers: [TraceInventoryRowsService],
  controllers: [TraceInventoryRowsController],
  imports: [SequelizeModule.forFeature([TraceInventoryRow], "trace_connection")],
  exports: [TraceInventoryRowsService],
})
export class TraceInventoryRowsModule {}
