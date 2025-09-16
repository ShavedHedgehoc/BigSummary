import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import TraceInventoryDoc from "src/trace_models/trace_inventory_doc.model";
import { GetInventoryDocsDto } from "./dto/get-inventory-docs.dto";
import { Op, col, fn } from "sequelize";
import TracePlant from "src/trace_models/trace_plant.model";
import { InjectModel } from "@nestjs/sequelize";
import TraceInventoryRow from "src/trace_models/trace_inventory_row.model";

@Injectable()
export class TraceInventoryDocsService {
  constructor(
    @InjectModel(TraceInventoryDoc, "trace_connection")
    private InventoryDocsRepository: typeof TraceInventoryDoc
  ) {}

  async getInventoryById(id: number) {
    const inventory = await this.InventoryDocsRepository.findOne({
      attributes: {
        exclude: ["PlantPK", "InventoryDocPK", "InventoryDate", "Finished"],
        include: [
          [col("TraceInventoryDoc.InventoryDocPK"), "id"],
          [col("TraceInventoryDoc.InventoryDate"), "date"],
          [col("TraceInventoryDoc.Finished"), "finished"],
          [col("plant.PlantName"), "plant_name"],
        ],
      },
      where: { InventoryDocPK: id },
      include: { model: TracePlant, as: "plant", attributes: [] },
    });
    if (!inventory) {
      throw new HttpException("Переучет не найден", HttpStatus.NOT_FOUND);
    }
    return inventory;
  }

  async getInventoryDocs(dto: GetInventoryDocsDto) {
    let filter = {};
    const dateFilter = {
      [Op.between]: [new Date(dto.filter.startDate), new Date(dto.filter.endDate)],
    };
    filter = {
      ...filter,
      InventoryDate: dateFilter,
    };
    if (dto.filter.plants.length > 0) {
      const plantFilter = { [Op.in]: [...dto.filter.plants] };
      filter = { ...filter, plantPK: plantFilter };
    }
    const count = await this.InventoryDocsRepository.count({
      where: { ...filter },
    });
    const inventories = await this.InventoryDocsRepository.findAll({
      attributes: {
        exclude: ["PlantPK", "InventoryDocPK", "InventoryDate", "Finished"],
        include: [
          [col("TraceInventoryDoc.InventoryDocPK"), "id"],
          [col("TraceInventoryDoc.InventoryDate"), "date"],
          [col("TraceInventoryDoc.Finished"), "finished"],

          [col("plant.PlantName"), "plant_name"],
          [fn("COUNT", col("inventory_rows.InventoryRowPK")), "records"],
        ],
      },
      include: [
        { model: TracePlant, as: "plant", attributes: [] },
        { model: TraceInventoryRow, as: "inventory_rows", attributes: [] },
      ],
      group: [
        "TraceInventoryDoc.InventoryDocPK",
        "TraceInventoryDoc.InventoryDate",
        "TraceInventoryDoc.Finished",
        "plant.PlantName",
      ],
      subQuery: false,

      where: { ...filter },
      order: [["InventoryDate", "ASC"]],
      limit: dto.limit,
      offset: dto.limit * (dto.page - 1),
    });

    return { total: count, rows: inventories };
  }
}
