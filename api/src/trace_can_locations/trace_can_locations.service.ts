import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import TraceCanLocation from "src/trace_models/trace_can_location.model";

@Injectable()
export class TraceCanLocationsService {
  constructor(
    @InjectModel(TraceCanLocation, "trace_connection")
    private traceCanLocationsRepository: typeof TraceCanLocation
  ) {}
  async getLastLocationByCanId(id: number) {
    const location = await this.traceCanLocationsRepository.findOne({
      where: { CanPK: id },
      order: [["CreateDate", "DESC"]],
    });
    return location;
  }
}
