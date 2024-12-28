import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import TraceBatch from "../trace_models/trace_batch.model";

@Injectable()
export class TraceBatchService {
  constructor(@InjectModel(TraceBatch, "trace_connection") private traceBatchRepository: typeof TraceBatch) {}
  async getByName(batchName: string): Promise<TraceBatch> {
    const traceBatch = await this.traceBatchRepository.findOne<TraceBatch>({ where: { BatchName: batchName } });
    if (!traceBatch) {
      throw new HttpException("Партия не найдена", HttpStatus.NOT_FOUND);
    }
    return traceBatch;
  }
}
