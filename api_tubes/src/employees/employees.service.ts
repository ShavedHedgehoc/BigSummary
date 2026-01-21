import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GetEmployeesListDto } from "./dto/get-employees-list.dto";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  // use in employee auth
  async getEmployeeByBarcode(barcode: string) {
    const employee = await this.prisma.employee.findUnique({ where: { barcode: barcode }, include: { rank: true } });
    if (employee && employee.banned) throw new HttpException("Доступ запрещен!", HttpStatus.FORBIDDEN);
    return employee;
  }

  async getEmployeeList(query: GetEmployeesListDto) {
    let filter = {};
    if (query.name) {
      filter = { ...filter, name: { contains: query.name, mode: "insensitive" } };
    }

    if (query.banned && query.banned.length > 0) {
      const bannedFilter = query.banned[0] === 1 ? false : true;
      filter = { ...filter, banned: bannedFilter };
    }

    if (query.ranks && query.ranks.length > 0) {
      filter = { ...filter, rank_id: { in: query.ranks } };
    }

    const total = await this.prisma.employee.count({ where: { ...filter } });
    const employees = await this.prisma.employee.findMany({
      where: { ...filter },
      include: { rank: true },
      orderBy: { name: query.name_asc ? "asc" : "desc" },
      take: query.limit,
      skip: query.limit * (query.page - 1),
    });
    return { employees: employees, total: total };
  }

  async changeBanned(employee_id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employee_id },
    });
    if (!employee) throw new HttpException("Сотрудник не найден", HttpStatus.NOT_FOUND);
    const updateEmployee = await this.prisma.employee.update({
      where: { id: employee_id },
      data: {
        banned: !employee.banned,
      },
    });
    return updateEmployee;
  }

  async createEmployee(dto: CreateEmployeeDto) {
    const rank = await this.prisma.rank.findUnique({ where: { id: dto.rank_id } });
    if (!rank) throw new HttpException("Разряд не найден", HttpStatus.NOT_FOUND);
    const employee = await this.prisma.employee.findUnique({
      where: { barcode: dto.barcode },
    });
    if (employee) throw new HttpException("Уже существует сотрудник с таким штрихкодом", HttpStatus.BAD_REQUEST);
    const createdEmployee = await this.prisma.employee.create({
      data: { ...dto },
    });
    return createdEmployee;
  }

  async deleteEmployee(employee_id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employee_id },
    });
    if (!employee) throw new HttpException("Сотрудник не найден", HttpStatus.NOT_FOUND);
    await this.prisma.employee.delete({ where: { id: employee_id } });
  }

  async updateEmployee(dto: UpdateEmployeeDto) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: dto.id },
    });
    if (!employee) throw new HttpException("Сотрудник не найден", HttpStatus.NOT_FOUND);

    const employee_with_same_barcode = await this.prisma.employee.findUnique({
      where: { barcode: dto.barcode },
    });

    if (employee_with_same_barcode && employee_with_same_barcode.id !== employee.id)
      throw new HttpException("Уже существует сотрудник с таким штрихкодом", HttpStatus.BAD_REQUEST);
    const rank = await this.prisma.rank.findUnique({ where: { id: dto.rank_id } });
    if (!rank) throw new HttpException("Разряд не найден", HttpStatus.NOT_FOUND);

    const updateEmployee = await this.prisma.employee.update({
      where: { id: dto.id },
      data: { name: dto.name, barcode: dto.barcode, rank_id: dto.rank_id, banned: employee.banned },
    });
    return updateEmployee;
  }
}
