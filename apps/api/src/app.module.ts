import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./v1/users/users.module";
import { ConfigModule } from "@nestjs/config";
import { RolesModule } from "./v1/roles/roles.module";
import { AuthModule } from "./v1/auth/auth.module";
import { OccupationsModule } from "./v1/occupations/occupations.module";
import { EmployeesModule } from "./v1/employees/employees.module";
import { SeriesModule } from "./v1/series/series.module";
import { ProductsModule } from "./v1/products/products.module";
import { DocsModule } from "./v1/docs/docs.module";
import { RecordsModule } from "./v1/records/records.module";
import { PlantsModule } from "./v1/plants/plants.module";
import { BoilsModule } from "./v1/boils/boils.module";
import { ConveyorsModule } from "./v1/conveyors/conveyors.module";
import { ApparatusesModule } from "./v1/apparatuses/apparatuses.module";
import { CansModule } from "./v1/cans/cans.module";
import { WorkshopsModule } from "./v1/workshops/workshops.module";
import { HistoriesModule } from "./v1/histories/histories.module";
import { HistoryTypesModule } from "./v1/history_types/hystory_types.module";
import { TokenModule } from "./v1/token/token.module";
import { TestModule } from "./v1/test/test.module";
import { BoilsListModule } from "./v1/boils.list/boils.list.module";
import { DocDetailModule } from "./v1/doc.detail/doc.detail.module";
import { DocsListModule } from "./v1/docs.list/docs.list.module";
import { RecordDetailModule } from "./v1/record.detail/record.detail.module";
import { UserRolesModule } from "./v1/user-roles/user-roles.module";
import { UserRolesListModule } from "./v1/user-roles.list/user-roles.list.module";
import { BasesModule } from "./v1/bases/bases.module";
import { NotesModule } from "./v1/notes/notes.module";
import { TraceBatchModule } from "./v1/trace_batch/trace_batch.module";
import { TraceWeightingsModule } from "./v1/trace_weightings/trace_weightings.module";
import { TraceLoadsModule } from "./v1/trace_loads/trace_loads.module";
import { TraceTechnologyModule } from "./v1/trace_technology/trace_technology.module";
import { RegulationsModule } from "./v1/regulations/regulations.module";
import { MarkingSampleModule } from "./v1/marking_sample/marking_sample.module";
import { RecordRegulationsModule } from "./v1/record_regulations/record_regulations.module";
import { SemiProductsModule } from "./v1/semi_products/semi_products.module";
import { ApiErrorsModule } from "./v1/api_errors/api_errors.module";
import { TraceCanRecordsModule } from "./v1/trace_can_records/trace_can_records.module";
import { TraceCansModule } from "./v1/trace_cans/trace_cans.module";
import { TracePlantsModule } from "./v1/trace_plants/trace_plants.module";
import { TraceCanStatesModule } from "./v1/trace_can_states/trace_can_states.module";
import { TraceCanLocationsModule } from "./v1/trace_can_locations/trace_can_locations.module";
import { TraceInventoryDocsModule } from "./v1/trace_inventory_docs/trace_inventory_docs.module";
import { TraceInventoryRowsModule } from "./v1/trace_inventory_rows/trace_inventory_rows.module";
import { TraceTrademarksModule } from "./v1/trace_trademarks/trace_trademarks.module";
import { ZplModule } from "./v1/zpl/zpl.module";
import { TestdbSqlModule } from "./v1/testdb_sql/testdb_sql.module";
import { TraceDirectConnectionModule } from "./v1/trace_direct_connection/trace_direct_connection.module";
import { UserSettingsModule } from "./v1/user-settings/user-settings.module";
import User from "./v1/users/users.model";
import Role from "./v1/roles/roles.model";
import UserRoles from "./v1/user-roles/user-roles.model";
import Employee from "./v1/employees/employees.model";
import Occupation from "./v1/occupations/occupations.model";
import Product from "./v1/products/products.model";
import Serie from "./v1/series/series.model";
import Doc from "./v1/docs/docs.model";
import Plant from "./v1/plants/plant.model";
import Can from "./v1/cans/cans.model";
import Record from "./v1/records/records.model";
import Apparatus from "./v1/apparatuses/apparatuses.model";
import Boil from "./v1/boils/boil.model";
import Conveyor from "./v1/conveyors/conveyor.model";
import Workshop from "./v1/workshops/workshop.model";
import History from "./v1/histories/histories.model";
import HistoryType from "./v1/history_types/history_types.model";
import Token from "./v1/token/token.model";
import Base from "./v1/bases/bases.model";
import Note from "./v1/notes/notes.model";
import TraceBatch from "./v1/trace_models/trace_batch.model";
import TraceWeighting from "./v1/trace_models/trace_weighting.model";
import TraceProduct from "./v1/trace_models/trace_product.model";
import TraceAuthor from "./v1/trace_models/trace_author.model";
import TraceLot from "./v1/trace_models/trace_lot.model";
import TraceManufacturer from "./v1/trace_models/trace_manufacturer.model";
import TraceManufacturerLot from "./v1/trace_models/trace_manufacturer_lot.model";
import TraceSeller from "./v1/trace_models/trace_seller.model";
import TraceTrademark from "./v1/trace_models/trace_trademark.model";
import TraceDocument from "./v1/trace_models/trace_document.model";
import TraceContainer from "./v1/trace_models/trace_container.model";
import TraceLoad from "./v1/trace_models/trace_loads.model";
import TraceBoil from "./v1/trace_models/trace_boils.model";
import TraceOperation from "./v1/trace_models/trace_operation.model";
import TraceBoilRecord from "./v1/trace_models/trace_boil_record.model";
import Regulation from "./v1/regulations/regulations.model";
import MarkingSample from "./v1/marking_sample/marking_sample.model";
import RecordRegulation from "./v1/record_regulations/record_regulations.model";
import SemiProduct from "./v1/semi_products/semi_products.model";
import ApiError from "./v1/api_errors/api_errors.model";
import TraceCan from "./v1/trace_models/trace_can.model";
import TraceCanRecord from "./v1/trace_models/trace_can_record.model";
import TracePlant from "./v1/trace_models/trace_plant.model";
import TraceCanState from "./v1/trace_models/trace_can_state.model";
import TraceBtProduct from "./v1/trace_models/trace_bt_product.model";
import TraceCanLocation from "./v1/trace_models/trace_can_location.model";
import TraceInventoryDoc from "./v1/trace_models/trace_inventory_doc.model";
import TraceInventoryRow from "./v1/trace_models/trace_inventory_row.model";
import TraceAuthorOccupation from "./v1/trace_models/tarce_author_occupation.model";
import * as DataTypes from "sequelize/lib/data-types";
import { RecordCountersModule } from "./v1/record_counters/record_counters.module";

import { HealthCheckModule } from "./v1/health_check/health_check.module";
import RecordCounter from "./v1/record_counters/record_counters.model";
import UserSettings from "./v1/user-settings/user-settings.model";
import { V2TrpcModule } from "./v2/trpc/v2-trpc.module";
import { EmployeeModule } from "./v2/employee/employee.module";
import { TrpcContextFactory } from "./v2/trpc/trpc-context.factory";

DataTypes.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);
  return date.format("YYYY-MM-DD HH:mm:ss.SSS");
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    V2TrpcModule,
    EmployeeModule,
    SequelizeModule.forRoot({
      dialect: "mssql",
      host: process.env.MSSQL_HOST,
      username: process.env.MSSQL_USERNAME,
      password: process.env.MSSQL_PASSWORD,
      database: "testdb",
      define: {
        createdAt: false,
        updatedAt: false,
      },
      timezone: process.env.NODE_ENV === "development" ? "+03:00" : "+00:00",
      name: "trace_test_db_connection",
      // logging: process.env.NODE_ENV === "development" ? true : false,
      logging: false,
      models: [],
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
      timezone: process.env.NODE_ENV === "development" ? "+03:00" : "+00:00",
      name: "trace_connection",
      // logging: process.env.NODE_ENV === "development" ? true : false,
      logging: false,
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
        TraceCan,
        TraceCanRecord,
        TracePlant,
        TraceCanState,
        TraceBtProduct,
        TraceCanLocation,
        TraceInventoryDoc,
        TraceInventoryRow,
        TraceAuthorOccupation,
      ],
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      // logging: process.env.NODE_ENV === "development" ? console.log : false,
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
        Regulation,
        MarkingSample,
        RecordRegulation,
        SemiProduct,
        ApiError,
        UserSettings,
        RecordCounter,
      ],
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    EmployeesModule,
    OccupationsModule,
    DocsModule,
    PlantsModule,
    RecordsModule,
    RecordCountersModule,
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
    RegulationsModule,
    MarkingSampleModule,
    RecordRegulationsModule,
    SemiProductsModule,
    ApiErrorsModule,
    TraceCanRecordsModule,
    TraceCansModule,
    TracePlantsModule,
    TraceCanStatesModule,
    TraceCanLocationsModule,
    TraceInventoryDocsModule,
    TraceInventoryRowsModule,
    TraceTrademarksModule,
    ZplModule,
    TestdbSqlModule,
    TraceDirectConnectionModule,
    UserSettingsModule,
    HealthCheckModule,
  ],
  providers: [TrpcContextFactory],
})
export default class AppModule { }
