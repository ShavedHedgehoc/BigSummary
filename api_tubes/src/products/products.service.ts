import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async getProductById(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id: id } });
    return product;
  }
}
