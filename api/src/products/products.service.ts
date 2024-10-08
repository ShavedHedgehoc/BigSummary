import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Product from "./products.model";
import { CreateProductDto } from "./dto/create-product.dto";
import { SeriesService } from "src/series/series.service";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productRepository: typeof Product,
    private serieService: SeriesService
  ) {}

  async createProduct(dto: CreateProductDto) {
    const serie = await this.serieService.getOrCreateByValue(dto.serie);
    const product = await this.productRepository.create({ ...dto, serieId: serie.id });
    return product;
  }

  async getAllProducts() {
    const products = await this.productRepository.findAll({ include: { all: true } });

    return products;
  }

  async getOrCreateByCode(code: string, marking: string, serieId: number) {
    const [product, created] = await this.productRepository.findOrCreate({ where: { code1C: code, marking: marking } });
    if (created) {
      product.marking = marking;
      product.serieId = serieId;
      await product.save();
    }
    return product;
  }
}
