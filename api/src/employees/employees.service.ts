import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Employee from "./employees.model";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { AddOccupationDto } from "./dto/add-occupation.dto";
import { OccupationsService } from "src/occupations/occupations.service";

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee)
    private employeeRepository: typeof Employee,
    private occupationService: OccupationsService
  ) {}

  async createEmployee(dto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.create(dto);
    return employee;
  }

  async getAllEmployees() {
    const employees = await this.employeeRepository.findAll({ include: { all: true } });
    return employees;
  }

  async getEmployeeByBarcode(barcode: string) {
    const employee = await this.employeeRepository.findOne({ where: { barcode: barcode }, include: { all: true } });
    return employee;
  }

  async addOccupation(dto: AddOccupationDto) {
    const employee = await this.employeeRepository.findByPk(dto.userId);
    const occupation = await this.occupationService.getOccupationByValue(dto.value);

    if (employee && occupation) {
      employee.occupationId = occupation.id;
      await employee.save();
      return dto;
    }
    throw new HttpException("Пользователь или специальность не найдена", HttpStatus.NOT_FOUND);
  }
}
