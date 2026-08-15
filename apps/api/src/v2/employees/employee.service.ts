import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import { TGetEmployeeByBarcode } from '@repo/schemas';




@Injectable()
export class EmployeeService {
    constructor(private readonly prisma: PrismaService) { }

    async getEmployeeByBarcode(barcode: string) {
        const employee = await this.prisma.client.employees.findUnique({
            where: { barcode: barcode },
            include: { occupations: true },
        });
        return employee;
    }
}
