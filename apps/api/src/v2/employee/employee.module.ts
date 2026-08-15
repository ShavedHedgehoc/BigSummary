import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { WorkstationEmployeeRouter } from './employee.workstaion.router';



@Module({
    providers: [EmployeeService, WorkstationEmployeeRouter],
})
export class EmployeeModule { }