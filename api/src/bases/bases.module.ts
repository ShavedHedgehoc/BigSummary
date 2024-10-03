import { Module } from "@nestjs/common";
import { BasesService } from "./bases.service";
import { SequelizeModule } from "@nestjs/sequelize";
import Base from "./bases.model";

@Module({
  providers: [BasesService],
  imports: [SequelizeModule.forFeature([Base])],
  exports: [BasesService],
})
export class BasesModule {}
