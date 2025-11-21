import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}
  getEmployeeByBarcode(barcode: string) {
    return this.prisma.employee.findUnique({ where: { barcode: barcode } });
  }
}
