import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { WorkstationEmployeeRouter } from './workstation-employee.router';
import { EmployeeRouter } from './employee.router';



@Module({
    providers: [EmployeeService, WorkstationEmployeeRouter, EmployeeRouter],
})
export class EmployeeModule { }
