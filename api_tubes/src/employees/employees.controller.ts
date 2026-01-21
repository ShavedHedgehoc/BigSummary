import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetEmployeesListDto } from "./dto/get-employees-list.dto";
import { UpdateEmployeeBannedStatusDto } from "./dto/update-employee-banned-status.dto";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { DeleteEmployeeDto } from "./dto/delete-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { ValidationExceptionFilter } from "src/validation-exception-filter";

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

  @ApiOperation({ summary: "Получить список сотрудников" })
  @Get("/list")
  getEmployees(@Query(new ValidationPipe({ transform: true })) query: GetEmployeesListDto) {
    return this.employeesService.getEmployeeList(query);
  }

  @ApiOperation({ summary: "Поменять статус доступа" })
  @Patch("/change_banned/:id")
  @UsePipes(new ValidationPipe({ transform: true }))
  changeBanned(@Param() params: UpdateEmployeeBannedStatusDto) {
    return this.employeesService.changeBanned(params.id);
  }

  @ApiOperation({ summary: "Создать сотрудника" })
  @Post()
  @UseFilters(new ValidationExceptionFilter())
  createEmployee(@Body(new ValidationPipe({ transform: true })) dto: CreateEmployeeDto) {
    return this.employeesService.createEmployee(dto);
  }

  @ApiOperation({ summary: "Удалить сотрудника" })
  @Delete("/:id")
  @UsePipes(new ValidationPipe({ transform: true }))
  deleteEmployee(@Param() params: DeleteEmployeeDto) {
    return this.employeesService.deleteEmployee(params.id);
  }

  @ApiOperation({ summary: "Обновить данные сотрудника" })
  @Patch()
  @UsePipes(new ValidationPipe({ transform: true }))
  updateEmployee(@Body(new ValidationPipe({ transform: true })) dto: UpdateEmployeeDto) {
    return this.employeesService.updateEmployee(dto);
  }
}
