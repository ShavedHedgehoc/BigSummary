import { Controller, Get, Param, Query } from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Сотрудники")
@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  GetAllEmployees() {
    return this.employeesService.getAllEmployees();
  }
  //  used in employee auth
  @Get("/by_barcode/:barcode")
  GetEmployeeByBarcode(@Param("barcode") barcode: string) {
    return this.employeesService.getEmployeeByBarcode(barcode);
  }
}
