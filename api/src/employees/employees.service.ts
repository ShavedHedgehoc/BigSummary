import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Employee from "./employees.model";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { AddOccupationDto } from "./dto/add-occupation.dto";
import { OccupationsService } from "src/occupations/occupations.service";
import Occupation from "src/occupations/occupations.model";
import { GetEmployeesDto } from "./dto/get-employees.dto";
import { Op } from "sequelize";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee)
    private employeeRepository: typeof Employee,
    private occupationService: OccupationsService
  ) {}

  async createEmployee(dto: CreateEmployeeDto) {
    try {
      const employee = await this.employeeRepository.create(dto);
      return employee;
    } catch (error) {
      if (error instanceof Error && error.name === "SequelizeUniqueConstraintError") {
        throw new HttpException("Пользователь с таким ФИО или штрихкодом уже существует", HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException("Неизвестная ошибка", HttpStatus.BAD_REQUEST);
      }
    }
  }

  async getById(id: number) {
    const employee = await this.employeeRepository.findByPk(id);
    return employee;
  }

  async getAllEmployees() {
    const employees = await this.employeeRepository.findAll({
      attributes: ["id", "name", "barcode"],
      include:
        // { all: true }
        [{ model: Occupation }],
    });
    return employees;
  }

  async getAllEmployeesWithFilter(dto: GetEmployeesDto) {
    console.log(dto);
    const nameOrder = dto.filter.nameAsc ? "ASC" : "DESC";
    let filter = {};
    if (dto.filter.name !== "") {
      const nameFilter = { [Op.iLike]: `%${dto.filter.name}%` };
      filter = { ...filter, name: nameFilter };
    }
    if (dto.filter.occupations.length > 0) {
      const occupationsFilter = { [Op.in]: [...dto.filter.occupations] };
      filter = { ...filter, occupationId: occupationsFilter };
    }
    const count = await this.employeeRepository.count({
      where: { ...filter },
    });

    const employees = await this.employeeRepository.findAll({
      attributes: ["id", "name", "barcode"],
      include: [{ model: Occupation }],
      where: { ...filter },
      order: [["name", nameOrder]],
      limit: dto.limit,
      offset: dto.limit * (dto.page - 1),
    });
    return { rows: employees, total: count };
  }

  async getEmployeeByBarcode(barcode: string) {
    const employee = await this.employeeRepository.findOne({ where: { barcode: barcode }, include: { all: true } });
    return employee;
  }

  async deleteEmployee(id: number) {
    const employee = await this.employeeRepository.findByPk(id);
    if (!employee) {
      throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    }
    try {
      await employee.destroy();
    } catch (error) {
      if (error instanceof Error && error.name === "SequelizeForeignKeyConstraintError") {
        throw new HttpException(
          "Существуют записи, связанные с этим пользователем. Удаление невозможно...",
          HttpStatus.BAD_REQUEST
        );
      } else {
        throw new HttpException("Неизвестная ошибка", HttpStatus.BAD_REQUEST);
      }
    }
  }

  async updateEmployee(dto: UpdateEmployeeDto) {
    const employee = await this.employeeRepository.findByPk(dto.id);
    if (!employee) {
      throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    }
    try {
      employee.set({
        name: dto.name,
        barcode: dto.barcode,
        occupationId: dto.occupationId,
      });
      await employee.save();
      return employee;
    } catch (error) {
      if (error instanceof Error && error.name === "SequelizeUniqueConstraintError") {
        throw new HttpException("Пользователь с таким ФИО или штрихкодом уже существует", HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException("Неизвестная ошибка", HttpStatus.BAD_REQUEST);
      }
    }
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
