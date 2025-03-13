import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import TubeRecord from "./tube_records.model";
import { GetActiveRecordsDto } from "./dto/get-active-records.dto";
import TubeConveyor from "src/tube_conveyors/tube_conveyors.model";
import { col } from "sequelize";
import Boil from "src/boils/boil.model";
import TubeProduct from "src/tube_products/tube_products.model";

@Injectable()
export class TubeRecordsService {
  constructor(
    @InjectModel(TubeRecord)
    private tubeRecordRepository: typeof TubeRecord
  ) {}

  async getActiveRecordsByConveyorName(dto: GetActiveRecordsDto) {
    const records = await this.tubeRecordRepository.findAll({
      attributes: {
        exclude: ["boil_id", "createdAt", "updatedAt", "tube_conveyor_id", "tube_product_id", "finished"],
        include: [
          [col("boil.value"), "boil_value"],
          [col("tube_product.code_1C"), "product_id"],
          [col("tube_product.name"), "product_name"],
        ],
      },
      where: { finished: false },
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
}
