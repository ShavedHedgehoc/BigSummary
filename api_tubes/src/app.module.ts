import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeesModule } from './employees/employees.module';
import { ExtrusionModule } from './extrusion/extrusion.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, EmployeesModule, ExtrusionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
