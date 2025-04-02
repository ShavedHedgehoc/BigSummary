import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import TubeMaterial from "./tube_materials.model";
import { CreateTubeMaterialDto } from "./dto/create-tube-material.dto";

@Injectable()
export class TubeMaterialsService {
  constructor(
    @InjectModel(TubeMaterial)
    private tubeMaterialRepositiry: typeof TubeMaterial
  ) {}

  async getOrCreateTubeMaterial(dto: CreateTubeMaterialDto) {
    const existsTubeMaterial = await this.tubeMaterialRepositiry.findOne({ where: { code_1C: dto.code_1C } });
    if (existsTubeMaterial) {
      return existsTubeMaterial;
    }
    const tubeMaterial = await this.tubeMaterialRepositiry.create(dto);
    return tubeMaterial;
  }
}
