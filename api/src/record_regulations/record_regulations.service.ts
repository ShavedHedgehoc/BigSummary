import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import RecordRegulation from "./record_regulations.model";
import { CreateRecordRegulationDto } from "./dto/create-record-regulation.dto";
import MarkingSample from "src/marking_sample/marking_sample.model";
import { col } from "sequelize";

@Injectable()
export class RecordRegulationsService {
  constructor(
    @InjectModel(RecordRegulation)
    private recordRegulationRepository: typeof RecordRegulation
  ) {}

  async createRecordRegulation(dto: CreateRecordRegulationDto) {
    const record_regulation = await this.recordRegulationRepository.create(dto);
    return record_regulation;
  }

  async getByRecordId(id: number) {
    const record_regulation = await this.recordRegulationRepository.findOne({
      where: { record_id: id },
      attributes: {
        exclude: ["id", "record_id", "marking_sample_id", "createdAt", "updatedAt"],
        include: [[col("marking_sample.value"), "marking_sample_value"]],
      },
      include: [{ model: MarkingSample, as: "marking_sample", attributes: [] }],
    });
    return record_regulation;
  }
}
