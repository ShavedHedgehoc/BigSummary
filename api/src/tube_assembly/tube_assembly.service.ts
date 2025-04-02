import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import TubeAssembly from "./tube_assembly.model";
import { CreateTubeAssemblyDto } from "./dto/create-tube-assembly.dto";
import { TubeConveyorPostsService } from "src/tube_conveyor_posts/tube_conveyor_posts.service";
import { TubeMaterialsService } from "src/tube_materials/tube_materials.service";

@Injectable()
export class TubeAssemblyService {
  constructor(
    @InjectModel(TubeAssembly)
    private tubeAssemblyRepository: typeof TubeAssembly,
    private tubeConveyorPostsService: TubeConveyorPostsService,
    private tubeMaterialsService: TubeMaterialsService
  ) {}
  async createTubeAssembly(dto: CreateTubeAssemblyDto) {
    const tube_material = await this.tubeMaterialsService.getOrCreateTubeMaterial({
      code_1C: dto.tube_material_code,
      name: dto.tube_material_name,
    });
    const conveyor_post = await this.tubeConveyorPostsService.getOrCreateByName(dto.tube_conveyor_post);
    const tube_assembly = await this.tubeAssemblyRepository.create({
      ...dto,
      tube_conveyor_post_id: conveyor_post.id,
      tube_material_id: tube_material.id,
    });
    return tube_assembly;
  }
}
