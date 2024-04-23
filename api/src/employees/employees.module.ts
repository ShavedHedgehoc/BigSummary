import { Module } from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { EmployeesController } from "./employees.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import Employee from "./employees.model";
import { OccupationsModule } from "src/occupations/occupations.module";

@Module({
  providers: [EmployeesService],
  controllers: [EmployeesController],
  imports: [SequelizeModule.forFeature([Employee]), OccupationsModule],
  exports: [EmployeesService],
})
export class EmployeesModule {}
