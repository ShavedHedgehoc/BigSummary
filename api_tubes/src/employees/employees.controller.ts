import { Controller, Get } from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Сотрудники")
@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }
}
