import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import TubeRecord from "./tube_records.model";
import { GetActiveRecordsDto } from "./dto/get-active-records.dto";
import TubeConveyor from "src/tube_conveyors/tube_conveyors.model";
import { col } from "sequelize";
import Boil from "src/boils/boil.model";
import TubeProduct from "src/tube_products/tube_products.model";
import { SetActiveRecordDto } from "./dto/set-active-record.dto";

@Injectable()
export class TubeRecordsService {
  constructor(
    @InjectModel(TubeRecord)
    private tubeRecordRepository: typeof TubeRecord
  ) {}

  async getPlannedRecordsByConveyorName(dto: GetActiveRecordsDto) {
    const records = await this.tubeRecordRepository.findAll({
      attributes: {
        exclude: ["boil_id", "createdAt", "updatedAt", "tube_conveyor_id", "tube_product_id", "finished"],
        include: [
          [col("boil.value"), "boil_value"],
          [col("tube_product.code_1C"), "product_id"],
          [col("tube_product.name"), "product_name"],
        ],
      },
      where: { finished: false, active: false },
      include: [
        {
          model: TubeConveyor,
          as: "tube_conveyor",
          where: { name: dto.conveyor_name },
          required: true,
          attributes: [],
        },
        { model: Boil, as: "boil", attributes: [] },
        { model: TubeProduct, as: "tube_product", attributes: [] },
      ],
    });
    return records;
  }

  async getActiveRecord(conveyor_name: string) {
    const existsActiveRecord = await this.tubeRecordRepository.findOne({
      attributes: {
        exclude: ["boil_id", "createdAt", "updatedAt", "tube_conveyor_id", "tube_product_id", "finished"],
        include: [
          [col("boil.value"), "boil_value"],
          [col("tube_product.code_1C"), "product_id"],
          [col("tube_product.name"), "product_name"],
        ],
      },
      where: {
        finished: false,
        active: true,
      },
      include: [
        {
          model: TubeConveyor,
          as: "tube_conveyor",
          where: { name: conveyor_name },
          required: true,
          attributes: [],
        },
        { model: Boil, as: "boil", attributes: [] },
        { model: TubeProduct, as: "tube_product", attributes: [] },
      ],
    });
    return existsActiveRecord;
  }

  async setActiveRecordByRecordId(dto: SetActiveRecordDto) {
    const existsActiveRecord = await this.getActiveRecord(dto.conveyor_name);
    if (existsActiveRecord) {
      throw new HttpException(
        `Уже существует выбранная строка для конвейера №${dto.conveyor_name}`,
        HttpStatus.CONFLICT
      );
    }
    const record = await this.tubeRecordRepository.findByPk(dto.record_id);
    if (!record) {
      throw new HttpException(`Запись не найдена`, HttpStatus.NOT_FOUND);
    }
    record.active = true;
    await record.save();
  }
}
