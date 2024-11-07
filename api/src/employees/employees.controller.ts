import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import Employee from "./employees.model";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { AddOccupationDto } from "./dto/add-occupation.dto";
import { GetEmployeesDto } from "./dto/get-employees.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";

@ApiTags("Пользователи рабочей станции")
@Controller("employees")
export class EmployeesController {
  constructor(private employeeService: EmployeesService) {}

  @ApiOperation({ summary: "Получить пользователя рабочей станции по штрихкоду" })
  @ApiResponse({ status: 200, type: Employee })
  @Get("/:barcode")
  getAllEmployeeByBarcode(@Param("barcode") barcode: string) {
    return this.employeeService.getEmployeeByBarcode(barcode);
  }

  @ApiOperation({ summary: "Получить пользователей с параметрами" })
  @ApiResponse({ status: 201, type: Employee })
  //   @Roles("USER")
  //   @UseGuards(RoleGuard)
  @Post("/list")
  getAllEmployeesWithFilter(@Body() dto: GetEmployeesDto) {
    return this.employeeService.getAllEmployeesWithFilter(dto);
  }

  @ApiOperation({ summary: "Создание нового пользователя рабочей станции" })
  @ApiResponse({ status: 201, type: Employee })
  @Post()
  create(@Body() dto: CreateEmployeeDto) {
    return this.employeeService.createEmployee(dto);
  }

  @ApiOperation({ summary: "Удалить пользователя рабочей станции по id" })
  @ApiResponse({ status: 201 })
  @Delete("/:id")
  deleteEmployeeById(@Param("id") id: string) {
    return this.employeeService.deleteEmployee(Number(id));
  }

  @ApiOperation({ summary: "Изменить пользователя рабочей станции" })
  @ApiResponse({ status: 201 })
  @Put()
  updateEmploee(@Body() dto: UpdateEmployeeDto) {
    return this.employeeService.updateEmployee(dto);
  }

  // Нужно?
  @ApiOperation({ summary: "Назначить специализацию пользователю рабочей станции" })
  @ApiResponse({ status: 200 })
  @Post("/occupation")
  addOccupation(@Body() dto: AddOccupationDto) {
    return this.employeeService.addOccupation(dto);
  }

  @ApiOperation({ summary: "Получить всех пользователей рабочей станции" })
  @ApiResponse({ status: 200, type: [Employee] })
  //   @Roles("USER")
  //   @UseGuards(RoleGuard)
  @Get()
  getAll() {
    return this.employeeService.getAllEmployees();
  }
}
