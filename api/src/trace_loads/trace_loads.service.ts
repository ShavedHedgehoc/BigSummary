import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import TraceLoad from "src/trace_models/trace_loads.model";
import TraceWeighting from "src/trace_models/trace_weighting.model";

@Injectable()
export class TraceLoadsService {
  constructor(@InjectModel(TraceLoad, "trace_connection") private traceLoadRepository: typeof TraceLoad) {}

  async parseWeightings(w_item: TraceWeighting, l_item: TraceLoad) {
    const container = await l_item.$get("container");
    const product = await w_item.$get("product");
    const lot = await w_item.$get("lot");
    const trademark = await lot.$get("trademark");
    const document = await l_item.$get("document");
    const user = await document.$get("author");
    return {
      id: l_item.LoadsPK,
      product_id: product.ProductId,
      product_name: product.ProductName,
      quantity: w_item.Quantity,
      container_id: container.ContainerPK,
      container_name: container.ContainerName,
      lot_id: lot.LotPK,
      lot: lot.LotName,
      trademark: trademark ? trademark.TrademarkName : null,
      user: user.AuthorName,
      date: new Date(document.CreateDate.setHours(document.CreateDate.getHours() + 3)),
    };
  }

  async parseWeightingsForTechnology(w_item: TraceWeighting, l_item: TraceLoad) {
    const container = await l_item.$get("container");
    const product = await w_item.$get("product");
    const lot = await w_item.$get("lot");
    const trademark = await lot.$get("trademark");
    const document = await l_item.$get("document");
    const user = await document.$get("author");
    return {
      operation_code: product.ProductId,
      operation_name: product.ProductName,
      quantity: w_item.Quantity,
      lot_name: lot.LotName,
      temperature: null,
      user: user.AuthorName,
      date: new Date(document.CreateDate.setHours(document.CreateDate.getHours() + 3)),
    };
  }

  async loadResult(item: TraceLoad) {
    const container = await item.$get("container");
    const weightings = await container.$get("weightings");
    return await Promise.all(await weightings.map((w_item) => this.parseWeightings(w_item, item)));
  }

  async loadForTechnologyResult(item: TraceLoad) {
    const container = await item.$get("container");
    const weightings = await container.$get("weightings");
    return await Promise.all(await weightings.map((w_item) => this.parseWeightingsForTechnology(w_item, item)));
  }

  async getLoadsRows(batchPK: number) {
    const loads = await this.traceLoadRepository.findAll<TraceLoad>({
      where: { BatchPK: batchPK },
    });
    const result = await Promise.all(await loads.map((item) => this.loadResult(item)));
    return result.flat(1);
  }

  async getLoadsRowsForTechnology(batchPK: number) {
    const loads = await this.traceLoadRepository.findAll<TraceLoad>({
      where: { BatchPK: batchPK },
    });
    const result = await Promise.all(await loads.map((item) => this.loadResult(item)));
    return result.flat(1);
  }
}
