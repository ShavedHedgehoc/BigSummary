import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { RolesModule } from "./roles/roles.module";
import { AuthModule } from "./auth/auth.module";
import { OccupationsModule } from "./occupations/occupations.module";
import { EmployeesModule } from "./employees/employees.module";
import { SeriesModule } from "./series/series.module";
import { ProductsModule } from "./products/products.module";
import { DocsModule } from "./docs/docs.module";
import { RecordsModule } from "./records/records.module";
import { PlantsModule } from "./plants/plants.module";
import { BoilsModule } from "./boils/boils.module";
import { ConveyorsModule } from "./conveyors/conveyors.module";
import { ApparatusesModule } from "./apparatuses/apparatuses.module";
import { CansModule } from "./cans/cans.module";
import { WorkshopsModule } from "./workshops/workshops.module";
import { HistoriesModule } from "./histories/histories.module";
import { HistoryTypesModule } from "./history_types/hystory_types.module";
import { TokenModule } from "./token/token.module";
import User from "./users/users.model";
import Role from "./roles/roles.model";
import UserRoles from "./roles/user-roles.model";
import Employee from "./employees/employees.model";
import Occupation from "./occupations/occupations.model";
import Product from "./products/products.model";
import Serie from "./series/series.model";
import Doc from "./docs/docs.model";
import Plant from "./plants/plant.model";
import Can from "./cans/cans.model";
import Record from "./records/records.model";
import Apparatus from "./apparatuses/apparatuses.model";
import Boil from "./boils/boil.model";
import Conveyor from "./conveyors/conveyor.model";
import Workshop from "./workshops/workshop.model";
import History from "./histories/histories.model";
import HistoryType from "./history_types/history_types.model";
import Token from "./token/token.model";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Role,
        UserRoles,
        Employee,
        Occupation,
        Product,
        Serie,
        Doc,
        Plant,
        Can,
        Record,
        Apparatus,
        Boil,
        Conveyor,
        Workshop,
        History,
        HistoryType,
        Token,
      ],
      autoLoadModels: true,
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    EmployeesModule,
    OccupationsModule,
    DocsModule,
    PlantsModule,
    RecordsModule,
    ProductsModule,
    SeriesModule,
    BoilsModule,
    ApparatusesModule,
    CansModule,
    ConveyorsModule,
    WorkshopsModule,
    HistoriesModule,
    HistoryTypesModule,
    TokenModule,
  ],
})
export default class AppModule {}
