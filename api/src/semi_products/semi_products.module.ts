import { Module } from "@nestjs/common";
import { SemiProductsService } from "./semi_products.service";
import { SequelizeModule } from "@nestjs/sequelize";
import SemiProduct from "./semi_products.model";
import { ProductsModule } from "src/products/products.module";
import { BoilsModule } from "src/boils/boils.module";

@Module({
  providers: [SemiProductsService],
  imports: [SequelizeModule.forFeature([SemiProduct]), ProductsModule, BoilsModule],
  exports: [SemiProductsService],
})
export class SemiProductsModule {}
