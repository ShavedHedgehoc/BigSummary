import { Module } from "@nestjs/common";
import { TraceDirectConnectionService } from "./trace_direct_connection.service";
import { TraceDirectConnectionController } from "./trace_direct_connection.controller";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  providers: [TraceDirectConnectionService],
  imports: [SequelizeModule.forFeature([], "trace_connection")],
  controllers: [TraceDirectConnectionController],
  exports: [TraceDirectConnectionService],
})
export class TraceDirectConnectionModule {}
