import { Module } from "@nestjs/common";
import { MarkingSampleService } from "./marking_sample.service";
import { MarkingSampleController } from "./marking_sample.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import MarkingSample from "./marking_sample.model";
import { ProductsModule } from "src/products/products.module";

@Module({
  providers: [MarkingSampleService],
  controllers: [MarkingSampleController],
  imports: [SequelizeModule.forFeature([MarkingSample])],
  exports: [MarkingSampleService],
})
export class MarkingSampleModule {}
