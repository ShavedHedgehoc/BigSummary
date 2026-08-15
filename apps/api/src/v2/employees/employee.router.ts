import { Query, Router } from 'nestjs-trpc';
import { Injectable } from '@nestjs/common';
import { EmployeeService } from './employee.service';


@Router({
    alias: 'employee.main',
})
@Injectable()
export class EmployeeRouter {
    constructor(private readonly employeeService: EmployeeService) { }
    @Query({

    })
    async getEmployeeByBarcode(barcode: string): Promise<any> {
        return this.employeeService.getEmployeeByBarcode(barcode);
    }
}
