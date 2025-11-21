import { Controller, Get, Param, Query } from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Сотрудники")
@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  //  used in employee auth
  @ApiOperation({ summary: "Получить сотрудника по штрихкоду" })
  @Get()
  getEmployeeByBarcode(@Query("barcode") barcode: string) {
    return this.employeesService.getEmployeeByBarcode(barcode);
  }
}
