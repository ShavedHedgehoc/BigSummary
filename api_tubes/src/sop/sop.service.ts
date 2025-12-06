import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SopService {
  constructor(private prisma: PrismaService) {}
  async getExtrusionSop(operation_id: number) {
    const extrusionSop = await this.prisma.extrusionSopPictures.findMany({ where: { operation_id: operation_id } });
    return { pictures: extrusionSop };
  }
  async getVarnishSop(operation_id: number) {
    const varnishSop = await this.prisma.varnishSopPictures.findMany({ where: { operation_id: operation_id } });
    return { pictures: varnishSop };
  }
  async getOffsetSop(operation_id: number) {
    const offsetSop = await this.prisma.offsetSopPictures.findMany({ where: { operation_id: operation_id } });
    return { pictures: offsetSop };
  }
  async getSealantSop(operation_id: number) {
    const sealantSop = await this.prisma.sealantSopPictures.findMany({ where: { operation_id: operation_id } });
    return { pictures: sealantSop };
  }
}
