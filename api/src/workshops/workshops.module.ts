import { Module } from "@nestjs/common";
import { WorkshopsController } from "./workshops.controller";
import { WorkshopsService } from "./workshops.service";
import { SequelizeModule } from "@nestjs/sequelize";
import Workshop from "./workshop.model";

@Module({
  controllers: [WorkshopsController],
  providers: [WorkshopsService],
  imports: [SequelizeModule.forFeature([Workshop])],
  exports: [WorkshopsService],
})
export class WorkshopsModule {}
