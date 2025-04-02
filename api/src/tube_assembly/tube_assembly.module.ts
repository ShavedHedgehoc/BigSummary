import { Module } from "@nestjs/common";
import { TubeAssemblyService } from "./tube_assembly.service";
import { SequelizeModule } from "@nestjs/sequelize";
import TubeAssembly from "./tube_assembly.model";
import { TubeConveyorPostsModule } from "src/tube_conveyor_posts/tube_conveyor_posts.module";
import { TubeMaterialsModule } from "src/tube_materials/tube_materials.module";

@Module({
  providers: [TubeAssemblyService],
  imports: [SequelizeModule.forFeature([TubeAssembly]), TubeConveyorPostsModule, TubeMaterialsModule],
  exports: [TubeAssemblyService],
})
export class TubeAssemblyModule {}
