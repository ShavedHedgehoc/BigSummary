import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateConsumedMaterialDto } from "./dto/create-consumed-material.dto";
import { ApiMessages } from "src/resources/api-messages";

@Injectable()
export class ConsumedMaterialsService {
  constructor(private prisma: PrismaService) {}

  async createConsumedMaterial(dto: CreateConsumedMaterialDto) {
    const material_in_specification = await this.prisma.specification.findFirst({
      where: { material: { code: dto.code } },
    });

    if (!material_in_specification)
      throw new HttpException(ApiMessages.MATERIAL_NOT_BELONG_TO_CURRENT, HttpStatus.BAD_REQUEST);

    const material_in_specification_by_post = await this.prisma.specification.findFirst({
      where: { material: { code: dto.code, post_number: dto.post_id } },
    });
    if (!material_in_specification_by_post)
      throw new HttpException(ApiMessages.MATERIAL_NOT_BELONG_TO_CURRENT_POST, HttpStatus.BAD_REQUEST);

    const lot = await this.prisma.lot.upsert({
      where: {
        material_lot: { value: dto.lot, material_id: material_in_specification_by_post.id },
      },
      update: {},
      create: {
        value: dto.lot,
        material_id: material_in_specification_by_post.id,
      },
    });

    const record = await this.prisma.consumedMaterial.create({
      data: {
        summary_id: dto.summary_id,
        employee_id: dto.employee_id,
        lot_id: lot.id,
        material_id: material_in_specification_by_post.id,
      },
    });
    return record;
  }
}
