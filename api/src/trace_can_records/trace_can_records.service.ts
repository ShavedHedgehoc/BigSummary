import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
// import { col } from "sequelize";
// import TraceBatch from "src/trace_models/trace_batch.model";
import TraceCanRecord from "src/trace_models/trace_can_record.model";
// import TraceCanState from "src/trace_models/trace_can_state.model";

@Injectable()
export class TraceCanRecordsService {
  constructor(
    @InjectModel(TraceCanRecord, "trace_connection")
    private traceCanRecordsRepository: typeof TraceCanRecord
  ) {}

  async getLastStateById(id: number) {
    const state = await this.traceCanRecordsRepository.findOne({
      where: { CanPK: id },
      // attributes: {
      //   include: [
      //     [col("state.CanStateName"), "stateValue"],
      //     [col("batch.BatchName"), "baseContain"],
      //   ],
      // },
      // include: [
      //   {
      //     model: TraceCanState,
      //     as: "state",
      //     attributes: [],
      //   },
      //   {
      //     model: TraceBatch,
      //     as: "batch",
      //     attributes: [],
      //   },
      // ],
      order: [["CreateDate", "DESC"]],
    });
    return state;
  }
}
