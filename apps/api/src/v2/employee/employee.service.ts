import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TRPCError } from '@trpc/server';




@Injectable()
export class EmployeeService {
    constructor(private readonly prisma: PrismaService) { }

    async getEmployeeByBarcode(barcode: string) {
        const employee = await this.prisma.pgClient.employees.findUnique({
            where: { barcode: barcode },
            include: { occupations: true },
        });
        if (!employee) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: `Employee with barcode ${barcode} not found`,
            });
        }

        return employee;
    }


}