import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { TraceLoadsService } from "src/trace_loads/trace_loads.service";
import TraceBoilRecord from "src/trace_models/trace_boil_record.model";

@Injectable()
export class TraceTechnologyService {
  constructor(
    @InjectModel(TraceBoilRecord, "trace_connection") private traceBoilRecordRepository: typeof TraceBoilRecord,
    private traceLoadService: TraceLoadsService
  ) {}

  async technologyResult(item: TraceBoilRecord) {
    const operation = await item.$get("operation");
    const author = await item.$get("author");
    const itemResult = {
      operation_code: operation.OperationCode,
      operation_name: operation.OperationName,
      quantity: null,
      lot_name: null,
      temperature: item.Temperature,
      user: author.AuthorName,
      date: new Date(item.CreateDate.setHours(item.CreateDate.getHours() + 3)),
    };

    return itemResult;
  }

  async getTechnologyRows(batchPK: number) {
    const technologies = await this.traceBoilRecordRepository.findAll<TraceBoilRecord>({
      where: { BatchId: batchPK },
      order: [["CreateDate", "ASC"]],
    });
    return await Promise.all(await technologies.map((item) => this.technologyResult(item)));
  }

  async getBoilCard(batchPK: number) {
    const tech_rows = await this.getTechnologyRows(batchPK);
    const load_rows = await this.traceLoadService.getLoadsRowsForTechnology(batchPK);
    return [...tech_rows, ...load_rows].sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));
  }
}
