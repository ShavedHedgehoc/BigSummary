import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PicturesService {
  constructor(private prisma: PrismaService) {}
  async getPicturesByProductId(product_id: number) {
    const pictures = await this.prisma.pictures.findMany({
      where: {
        product_id: product_id,
      },
    });
    return { pictures: pictures };
  }
}
