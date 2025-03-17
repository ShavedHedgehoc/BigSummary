import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { col } from "sequelize";
import TraceAuthor from "src/trace_models/trace_author.model";
import TraceBatch from "src/trace_models/trace_batch.model";
// import { col } from "sequelize";
// import TraceBatch from "src/trace_models/trace_batch.model";
import TraceCanRecord from "src/trace_models/trace_can_record.model";
import TraceCanState from "src/trace_models/trace_can_state.model";
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

      order: [["CreateDate", "DESC"]],
    });
    return state;
  }

  async getLastTenRecordsById(id: number) {
    const states = await this.traceCanRecordsRepository.findAll({
      attributes: {
        exclude: ["CanRecordPK", "CanPK", "AuthorPK", "BatchPK", "CanStatePK"],
        include: [
          [col("state.CanStateDescription"), "stateDescription"],
          [col("author.AuthorName"), "authorName"],
          [col("batch.BatchName"), "baseContain"],
        ],
      },
      include: [
        {
          model: TraceCanState,
          as: "state",
          attributes: [],
        },
        {
          model: TraceBatch,
          as: "batch",
          attributes: [],
        },
        {
          model: TraceAuthor,
          as: "author",
          attributes: [],
        },
      ],
      where: { CanPK: id },
      order: [["CreateDate", "DESC"]],
      limit: 10,
    });
    return states;
  }
}
