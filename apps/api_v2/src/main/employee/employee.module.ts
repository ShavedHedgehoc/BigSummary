import { Module } from '@nestjs/common';
import { WorkstationEmployeeService } from './workstation.employee.service';
import { ApplicationEmployeeService } from './application.employee.service';

@Module({
  providers: [WorkstationEmployeeService, ApplicationEmployeeService],
  exports: [WorkstationEmployeeService, ApplicationEmployeeService],
})
export class EmployeeModule {}
