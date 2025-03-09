import { Module } from "@nestjs/common";
import { TubeMaterialsService } from "./tube_materials.service";
import TubeMaterial from "./tube_materials.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  providers: [TubeMaterialsService],
  imports: [SequelizeModule.forFeature([TubeMaterial])],
})
export class TubeMaterialsModule {}
