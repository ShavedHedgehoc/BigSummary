import { Module } from "@nestjs/common";
import { BasesService } from "./bases.service";
import { SequelizeModule } from "@nestjs/sequelize";
import Base from "./bases.model";
import { BaseController } from "./bases.controller";

@Module({
  providers: [BasesService],
  controllers: [BaseController],
  imports: [SequelizeModule.forFeature([Base])],
  exports: [BasesService],
})
export class BasesModule {}
