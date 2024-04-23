import { Module } from "@nestjs/common";
import { DocsService } from "./docs.service";
import { DocsController } from "./docs.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import Doc from "./docs.model";
import { PlantsModule } from "src/plants/plants.module";

@Module({
  providers: [DocsService],
  controllers: [DocsController],
  imports: [SequelizeModule.forFeature([Doc]), PlantsModule],
  exports: [DocsService],
})
export class DocsModule {}
