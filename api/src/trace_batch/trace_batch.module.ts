import { Module } from "@nestjs/common";
import { TraceBatchService } from "./trace_batch.service";
import { TraceBatchController } from "./trace_batch.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import TraceBatch from "../trace_models/trace_batch.model";

@Module({
  providers: [TraceBatchService],
  controllers: [TraceBatchController],
  imports: [SequelizeModule.forFeature([TraceBatch], "trace_connection")],
  exports: [TraceBatchService],
})
export class TraceBatchModule {}
