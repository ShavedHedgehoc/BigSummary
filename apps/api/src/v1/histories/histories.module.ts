import { Module } from "@nestjs/common";
import { HistoriesController } from "./histories.controller";
import { HistoriesService } from "./histories.service";
import { SequelizeModule } from "@nestjs/sequelize";
import History from "./histories.model";
import { HistoryTypesModule } from "src/v1/history_types/hystory_types.module";
import { RecordsModule } from "src/v1/records/records.module";
import { HttpModule } from "@nestjs/axios";
import { UsersModule } from "src/v1/users/users.module";
import { BoilsModule } from "src/v1/boils/boils.module";
import { EmployeesModule } from "src/v1/employees/employees.module";
import { ProductsModule } from "src/v1/products/products.module";
import { BasesModule } from "src/v1/bases/bases.module";
import { NotesModule } from "src/v1/notes/notes.module";
import { AuthModule } from "src/v1/auth/auth.module";
import { ApiErrorsModule } from "src/v1/api_errors/api_errors.module";

@Module({
  controllers: [HistoriesController],
  providers: [HistoriesService],
  imports: [
    SequelizeModule.forFeature([History]),
    HistoryTypesModule,
    HttpModule,
    UsersModule,
    BoilsModule,
    RecordsModule,
    EmployeesModule,
    ProductsModule,
    BasesModule,
    NotesModule,
    AuthModule,
    ApiErrorsModule,
  ],
  exports: [HistoriesService],
})
export class HistoriesModule { }
