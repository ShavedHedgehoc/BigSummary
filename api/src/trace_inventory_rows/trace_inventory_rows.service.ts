import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import TraceInventoryRow from "src/trace_models/trace_inventory_row.model";
import { GetInventoryRowsByIdWithFilterDto } from "./dto/get-inventory-rows-by-id-with-filter.dto";
import { Op, col, fn, literal } from "sequelize";
import TraceLot from "src/trace_models/trace_lot.model";
import TraceProduct from "src/trace_models/trace_product.model";
import TraceAuthor from "src/trace_models/trace_author.model";

@Injectable()
export class TraceInventoryRowsService {
  constructor(
    @InjectModel(TraceInventoryRow, "trace_connection")
    private inventoryRowsRepository: typeof TraceInventoryRow
  ) {}

  async getInventoryByIdWithFilter(dto: GetInventoryRowsByIdWithFilterDto) {
    let filter = {};
    if (dto.filter.productCode !== "") {
      const productFilter = { [Op.like]: `%${dto.filter.productCode}%` };
      filter = { ...filter, ProductId: productFilter };
    }
    if (dto.filter.dayToExpire && dto.filter.toFilter) {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      currentDate.setDate(currentDate.getDate() + dto.filter.dayToExpire);
      const expireFilter = {
        [Op.lt]: currentDate,
      };

      filter = { ...filter, ExpDate: expireFilter };
    }

    const inventory_rows = await this.inventoryRowsRepository.findAll({
      attributes: [
        [col("inventoryRowPK"), "id"],
        [col("TraceInventoryRow.ProductId"), "product_id"],
        [col("product.ProductName"), "product_name"],
        [col("TraceInventoryRow.LotPK"), "lot_id"],
        [col("lot.LotName"), "lot_name"],
        [col("TraceInventoryRow.Quantity"), "quantity"],
        [col("TraceInventoryRow.ExpDate"), "exp_date"],
        [col("author.AuthorName"), "author_name"],
        [fn("DATEDIFF", literal("day"), literal("GETDATE()"), col("TraceInventoryRow.ExpDate")), "days_to_exp"],
      ],
      where: { InventoryDocPK: dto.inventoryId, ...filter },
      include: [
        { model: TraceProduct, as: "product", attributes: [] },
        { model: TraceLot, as: "lot", attributes: [] },
        { model: TraceAuthor, as: "author", attributes: [] },
      ],
    });
    return inventory_rows;
  }
}
