import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import SemiProduct from "./semi_products.model";
import { CreateSemiProductDto } from "./dto/create-semi-product.dto";
import { ProductsService } from "src/products/products.service";
import { BoilsService } from "src/boils/boils.service";
import Product from "src/products/products.model";
import Boil from "src/boils/boil.model";
import { col } from "sequelize";

@Injectable()
export class SemiProductsService {
  constructor(
    @InjectModel(SemiProduct)
    private semiProductsService: typeof SemiProduct,
    private productsService: ProductsService,
    private boilsService: BoilsService
  ) {}

  async createSemiProduct(dto: CreateSemiProductDto) {
    const product = await this.productsService.getOrCreateByCode(dto.code, dto.marking, null);
    const boil = await this.boilsService.getOrCreateByValue(dto.boil);
    const semiProduct = await this.semiProductsService.create({
      record_id: dto.record_id,
      product_id: product.id,
      boil_id: boil.id,
    });
    return semiProduct;
  }

  async getSemiProductsByRecordId(id: number) {
    const semiProducts = await this.semiProductsService.findAll({
      where: { record_id: id },
      attributes: {
        exclude: ["id", "record_id", "product_id", "boil_id", "createdAt", "updatedAt"],
        include: [
          [col("product.code1C"), "code"],
          [col("product.marking"), "marking"],
          [col("boil.value"), "boil_value"],
        ],
      },
      include: [
        { model: Product, as: "product", attributes: [] },
        { model: Boil, as: "boil", attributes: [] },
      ],
    });
    return semiProducts;
  }
}
