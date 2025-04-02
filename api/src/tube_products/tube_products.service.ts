import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import TubeProduct from "./tube_products.model";

@Injectable()
export class TubeProductsService {
  constructor(
    @InjectModel(TubeProduct)
    private tubeProductRepository: typeof TubeProduct
  ) {}

  async getOrCreateByCode(code: string, marking: string, name: string) {
    const existProduct = await this.tubeProductRepository.findOne({ where: { code_1C: code } });
    if (existProduct) {
      return existProduct;
    }
    const tube_product = await this.tubeProductRepository.create({ code_1C: code, marking: marking, name: name });
    return tube_product;
  }
}
