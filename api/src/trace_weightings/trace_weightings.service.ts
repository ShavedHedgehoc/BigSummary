import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import TraceWeighting from "../trace_models/trace_weighting.model";

@Injectable()
export class TraceWeightingsService {
  constructor(
    @InjectModel(TraceWeighting, "trace_connection") private traceWeightingRepository: typeof TraceWeighting
  ) {}

  async weightingResult(item: TraceWeighting) {
    const product = await item.$get("product");
    const container = await item.$get("container");
    const lot = await item.$get("lot");
    const trademark = await lot.$get("trademark");
    const document = await item.$get("document");
    const user = await document.$get("author");

    const itemResult = {
      id: item.WeightingsPK,
      product_id: item.ProductId,
      product_name: product.ProductName ? product.ProductName : null,
      quantity: item.Quantity,
      container_id: container.ContainerPK,
      container_name: container.ContainerName,
      lot_id: lot.LotPK,
      lot: lot.LotName,
      trademark: trademark ? trademark.TrademarkName : null,
      user: user.AuthorName,
      date: new Date(document.CreateDate.setHours(document.CreateDate.getHours() + 3)),
    };

    return itemResult;
  }

  async getWeightingsRows(batchPK: number) {
    const weightings = await this.traceWeightingRepository.findAll<TraceWeighting>({
      where: { BatchPK: batchPK },
    });
    return await Promise.all(await weightings.map((item) => this.weightingResult(item)));
  }
}
