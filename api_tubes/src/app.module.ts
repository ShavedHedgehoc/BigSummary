import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, EmployeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
