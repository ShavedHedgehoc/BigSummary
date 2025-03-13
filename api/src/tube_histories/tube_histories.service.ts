import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import TubeHistory from "./tube_histories.model";
import TubeConveyor from "src/tube_conveyors/tube_conveyors.model";
import { GetLastHistoryDto } from "./dto/get-last-history.dto";
import TubeRecord from "src/tube_records/tube_records.model";
import { col } from "sequelize";
import TubeHistoryType from "src/tube_history_types/tube_history_types.model";
import { CreateTubeHistoryDto } from "./dto/create-tube-history.dto";
import { TubeHistoryTypesService } from "src/tube_history_types/tube_history_types.service";

@Injectable()
export class TubeHistoriesService {
  constructor(
    @InjectModel(TubeHistory)
    private tubeHistoriesRepository: typeof TubeHistory,
    private tubeHistoryTypesService: TubeHistoryTypesService
  ) {}

  async getLastHistoryByConveyorName(dto: GetLastHistoryDto) {
    const lastHistory = await this.tubeHistoriesRepository.findOne({
      attributes: {
        exclude: [
          "id",
          "tube_record_id",
          "tube_history_type_id",
          "employee_id",
          "note",
          "tube_history_note_id",
          "createdAt",
          "updatedAt",
        ],
        include: [
          [col("tube_history_type.value"), "value"],
          [col("tube_history_type.description"), "description"],
        ],
      },
      include: [
        { model: TubeHistoryType, as: "tube_history_type", attributes: [] },
        {
          model: TubeRecord,
          required: true,
          attributes: [],
          include: [{ model: TubeConveyor, attributes: [], where: { name: dto.conveyor_name }, required: true }],
        },
      ],
      order: [["id", "DESC"]],
    });
    return lastHistory;
  }

  async createHistory(dto: CreateTubeHistoryDto) {
    const historyType = await this.tubeHistoryTypesService.getHistoryTypeByValue(dto.history_type);
    if (!historyType) {
      throw new HttpException("Тип записи не найден (TubeHistoriesService)", HttpStatus.NOT_FOUND);
    }
    const history = await this.tubeHistoriesRepository.create({ ...dto, tube_history_type_id: historyType.id });
  }
}
