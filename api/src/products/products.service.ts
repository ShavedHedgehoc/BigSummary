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

  async getById(id: number) {
    const product = await this.productRepository.findByPk(id);
    return product;
  }

  async getOrCreateByCode(code: string, marking: string, serieId: number) {
    // console.log(code, marking, serieId);
    // const [product, created] = await this.productRepository.findOrCreate({ where: { code1C: code, marking: marking } });
    const [product, created] = await this.productRepository.findOrCreate({ where: { code1C: code } });
    if (created) {
      product.marking = marking;
      product.serieId = serieId;
      await product.save();
    }
    return product;
  }
}
