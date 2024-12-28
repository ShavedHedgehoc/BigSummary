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
import { SeederModule } from "nestjs-sequelize-seeder";
import { TestModule } from "./test/test.module";
import { BoilsListModule } from "./boils.list/boils.list.module";
import { DocDetailModule } from "./doc.detail/doc.detail.module";
import { DocsListModule } from "./docs.list/docs.list.module";
import { RecordDetailModule } from "./record.detail/record.detail.module";
import { UserRolesModule } from "./user-roles/user-roles.module";
import { UserRolesListModule } from "./user-roles.list/user-roles.list.module";
import { BasesModule } from "./bases/bases.module";
import { NotesModule } from "./notes/notes.module";
import { TraceBatchModule } from "./trace_batch/trace_batch.module";
import { TraceWeightingsModule } from "./trace_weightings/trace_weightings.module";
import { TraceLoadsModule } from "./trace_loads/trace_loads.module";
import { TraceTechnologyModule } from './trace_technology/trace_technology.module';
import User from "./users/users.model";
import Role from "./roles/roles.model";
import UserRoles from "./user-roles/user-roles.model";
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
import Base from "./bases/bases.model";
import Note from "./notes/notes.model";
import TraceBatch from "./trace_models/trace_batch.model";
import TraceWeighting from "./trace_models/trace_weighting.model";
import TraceProduct from "./trace_models/trace_product.model";
import TraceAuthor from "./trace_models/trace_author.model";
import TraceLot from "./trace_models/trace_lot.model";
import TraceManufacturer from "./trace_models/trace_manufacturer.model";
import TraceManufacturerLot from "./trace_models/trace_manufacturer_lot.model";
import TraceSeller from "./trace_models/trace_seller.model";
import TraceTrademark from "./trace_models/trace_trademark.model";
import TraceDocument from "./trace_models/trace_document.model";
import TraceContainer from "./trace_models/trace_container.model";
import TraceLoad from "./trace_models/trace_loads.model";
import TraceBoil from "./trace_models/trace_boils.model";
import TraceOperation from "./trace_models/trace_operation.model";
import TraceBoilRecord from "./trace_models/trace_boil_record.model";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: "mssql",
      host: process.env.MSSQL_HOST,
      username: process.env.MSSQL_USERNAME,
      password: process.env.MSSQL_PASSWORD,
      database: process.env.MSSQL_DB,
      define: {
        createdAt: false,
        updatedAt: false,
      },
      name: "trace_connection",
      models: [
        TraceAuthor,
        TraceBatch,
        TraceBoil,
        TraceBoilRecord,
        TraceContainer,
        TraceDocument,
        TraceLoad,
        TraceLot,
        TraceManufacturer,
        TraceManufacturerLot,
        TraceOperation,
        TraceProduct,
        TraceSeller,
        TraceTrademark,
        TraceWeighting,
      ],
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      logging: false,
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
        Base,
        Note,
      ],
      autoLoadModels: true,
    }),
    SeederModule.forRoot({
      runOnlyIfTableIsEmpty: true,
      foreignDelay: 10000,
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
    TestModule,
    BoilsListModule,
    DocDetailModule,
    DocsListModule,
    RecordDetailModule,
    UserRolesModule,
    UserRolesListModule,
    BasesModule,
    NotesModule,
    TraceBatchModule,
    TraceWeightingsModule,
    TraceLoadsModule,
    TraceTechnologyModule,
  ],
})
export default class AppModule {}
