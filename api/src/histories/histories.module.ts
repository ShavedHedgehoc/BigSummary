import { Module } from "@nestjs/common";
import { HistoriesController } from "./histories.controller";
import { HistoriesService } from "./histories.service";
import { SequelizeModule } from "@nestjs/sequelize";
import History from "./histories.model";
import { HistoryTypesModule } from "src/history_types/hystory_types.module";
import { RecordsModule } from "src/records/records.module";
import { HttpModule } from "@nestjs/axios";
import { UsersModule } from "src/users/users.module";
import { BoilsModule } from "src/boils/boils.module";
import { EmployeesModule } from "src/employees/employees.module";
import { ProductsModule } from "src/products/products.module";
import { BasesModule } from "src/bases/bases.module";
import { NotesModule } from "src/notes/notes.module";

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
  ],
  exports: [HistoriesService],
})
export class HistoriesModule {}
