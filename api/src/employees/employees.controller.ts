import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import Employee from "./employees.model";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { AddOccupationDto } from "./dto/add-occupation.dto";

@ApiTags("Пользователи рабочей станции")
@Controller("employees")
export class EmployeesController {
  constructor(private employeeService: EmployeesService) {}

  @ApiOperation({ summary: "Получить всех пользователей рабочей станции" })
  @ApiResponse({ status: 200, type: [Employee] })
  //   @Roles("USER")
  //   @UseGuards(RoleGuard)
  @Get()
  getAll() {
    return this.employeeService.getAllEmployees();
  }

  @ApiOperation({ summary: "Получить пользователя рабочей станции по штрихкоду" })
  @ApiResponse({ status: 200, type: Employee })
  @Get("/:barcode")
  getAllEmployeeByBarcode(@Param("barcode") barcode: string) {
    return this.employeeService.getEmployeeByBarcode(barcode);
  }

  @ApiOperation({ summary: "Создание нового пользователя рабочей станции" })
  @ApiResponse({ status: 201, type: Employee })
  @Post()
  create(@Body() dto: CreateEmployeeDto) {
    return this.employeeService.createEmployee(dto);
  }

  @ApiOperation({ summary: "Назначить специализацию пользователю рабочей станции" })
  @ApiResponse({ status: 200 })
  @Post("/occupation")
  addOccupation(@Body() dto: AddOccupationDto) {
    return this.employeeService.addOccupation(dto);
  }
}
