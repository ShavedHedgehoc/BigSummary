import { Module } from "@nestjs/common";
import { TubeProductsService } from "./tube_products.service";
import TubeProduct from "./tube_products.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  providers: [TubeProductsService],
  imports: [SequelizeModule.forFeature([TubeProduct])],
})
export class TubeProductsModule {}
