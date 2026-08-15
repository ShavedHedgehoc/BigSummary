import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Product from 'src/models/products.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productsService: typeof Product,
  ) {}
  async getProductById(id: number) {
    const product = await this.productsService.findByPk(id);
    return product;
  }
}
