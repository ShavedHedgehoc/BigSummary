import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { SequelizeModule } from "@nestjs/sequelize";
import Product from "./products.model";
import { SeriesModule } from "src/series/series.module";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [SequelizeModule.forFeature([Product]), SeriesModule],
  exports: [ProductsService],
})
export class ProductsModule {}
