import { Module } from '@nestjs/common';
import { WorkstationEmployeeService } from './workstation.employee.service';

@Module({
    providers: [WorkstationEmployeeService],
    exports: [WorkstationEmployeeService],
})
export class EmployeeModule { }