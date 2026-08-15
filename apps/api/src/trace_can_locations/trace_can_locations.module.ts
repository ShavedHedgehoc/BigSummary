import { Module } from "@nestjs/common";
import { TraceCanLocationsService } from "./trace_can_locations.service";
import { SequelizeModule } from "@nestjs/sequelize";
import TraceCanLocation from "src/trace_models/trace_can_location.model";

@Module({
  providers: [TraceCanLocationsService],
  imports: [SequelizeModule.forFeature([TraceCanLocation], "trace_connection")],
  exports: [TraceCanLocationsService],
})
export class TraceCanLocationsModule {}
