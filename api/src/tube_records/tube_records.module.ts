import { Module } from "@nestjs/common";
import { TubeRecordsService } from "./tube_records.service";
import TubeRecord from "./tube_records.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { TubeRecordsController } from "./tube_records.controller";
import { BoilsModule } from "src/boils/boils.module";
import { TubeProductsModule } from "src/tube_products/tube_products.module";
import { TubeConveyorsModule } from "src/tube_conveyors/tube_conveyors.module";
import { TubeParametersModule } from "src/tube_parameters/tube_parameters.module";
import { TubeAssemblyModule } from "src/tube_assembly/tube_assembly.module";

@Module({
  providers: [TubeRecordsService],
  imports: [
    SequelizeModule.forFeature([TubeRecord]),
    TubeProductsModule,
    BoilsModule,
    TubeConveyorsModule,
    TubeParametersModule,
    TubeAssemblyModule,
  ],
  controllers: [TubeRecordsController],
})
export class TubeRecordsModule {}
