import { Module } from "@nestjs/common";
import { WorkersService } from "./workers.service";
import { WorkersController } from "./workers.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import Worker from "./workers.model";
import Occupation from "src/occupations/occupations.model";

@Module({
  providers: [WorkersService],
  controllers: [WorkersController],
  imports: [SequelizeModule.forFeature([Worker, Occupation])],
})
export class WorkersModule {}
