import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  providers: [EmployeesService],
  controllers: [EmployeesController],
  imports: [DrizzleModule],
})
export class EmployeesModule {}
