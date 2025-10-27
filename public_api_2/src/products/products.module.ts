import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Product from 'src/models/products.model';

@Module({
  providers: [ProductsService],
  imports: [SequelizeModule.forFeature([Product])],
  exports: [ProductsService],
})
export class ProductsModule {}
