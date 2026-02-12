import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductionBoxDto } from "./dto/create-production-box.dto";
import { ApiMessages } from "src/resources/api-messages";

@Injectable()
export class ProductionBoxService {
  constructor(private prisma: PrismaService) {}

  async createProductionBox(dto: CreateProductionBoxDto) {
    const existsBox = await this.prisma.productionBox.findUnique({ where: { uuid: dto.uuid } });
    if (existsBox) throw new HttpException(ApiMessages.BOX_ALREADY_IN_DATABASE, HttpStatus.BAD_REQUEST);
    const box = await this.prisma.productionBox.create({ data: { ...dto } });
    return box;
  }

  async getProductionBoxes({ batch_id }: { batch_id: string | undefined }) {
    let batchFilter = {};

    if (batch_id) {
      batchFilter = { ...batchFilter, batch_id: Number(batch_id) };
    }
    const boxes = await this.prisma.productionBox.findMany({
      where: {
        ...batchFilter,
      },
      orderBy: { id: "desc" },
      include: {
        employee: true,
        summary: {
          include: {
            batch: true,
            product: true,
          },
        },
      },
    });
    return boxes;
  }
}
