import { Module } from "@nestjs/common";
import { TracePlantsService } from "./trace_plants.service";
import { TracePlantsController } from "./trace_plants.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import TracePlant from "src/trace_models/trace_plant.model";

@Module({
  providers: [TracePlantsService],
  controllers: [TracePlantsController],
  imports: [SequelizeModule.forFeature([TracePlant], "trace_connection")],
  exports: [TracePlantsService],
})
export class TracePlantsModule {}
