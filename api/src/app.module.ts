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
// import { SeederModule } from "nestjs-sequelize-seeder";
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
import { TraceTechnologyModule } from "./trace_technology/trace_technology.module";
import { RegulationsModule } from "./regulations/regulations.module";
import { MarkingSampleModule } from "./marking_sample/marking_sample.module";
import { RecordRegulationsModule } from "./record_regulations/record_regulations.module";
import { SemiProductsModule } from "./semi_products/semi_products.module";
import { ApiErrorsModule } from "./api_errors/api_errors.module";
import { TraceCanRecordsModule } from "./trace_can_records/trace_can_records.module";
import { TraceCansModule } from "./trace_cans/trace_cans.module";

import { TracePlantsModule } from "./trace_plants/trace_plants.module";
import { TraceCanStatesModule } from "./trace_can_states/trace_can_states.module";
import { TraceCanLocationsModule } from "./trace_can_locations/trace_can_locations.module";
import { TubeProductsModule } from "./tube_products/tube_products.module";
import { TubeConveyorsModule } from "./tube_conveyors/tube_conveyors.module";
import { TubeRecordsModule } from "./tube_records/tube_records.module";
import { TubeMaterialsModule } from "./tube_materials/tube_materials.module";
import { TubeConveyorPostsModule } from "./tube_conveyor_posts/tube_conveyor_posts.module";
import { TubeSpecificationsModule } from "./tube_specifications/tube_specifications.module";
import { TubeHistoryTypesModule } from "./tube_history_types/tube_history_types.module";

import { TubeHistoriesModule } from "./tube_histories/tube_histories.module";
import { TubeHistoryNotesModule } from "./tube_history_notes/tube_history_notes.module";
import { TubeSessionsModule } from "./tube_sessions/tube_sessions.module";
import { TubeParametersModule } from "./tube_parameters/tube_parameters.module";
import { TubeAssemblyModule } from "./tube_assembly/tube_assembly.module";
import { TraceInventoryDocsModule } from "./trace_inventory_docs/trace_inventory_docs.module";
import { TraceInventoryRowsModule } from "./trace_inventory_rows/trace_inventory_rows.module";
import { TraceTrademarksModule } from "./trace_trademarks/trace_trademarks.module";
import { ZplModule } from "./zpl/zpl.module";
import { TestdbSqlModule } from "./testdb_sql/testdb_sql.module";
import { TraceDirectConnectionModule } from "./trace_direct_connection/trace_direct_connection.module";
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
import Regulation from "./regulations/regulations.model";
import MarkingSample from "./marking_sample/marking_sample.model";
import RecordRegulation from "./record_regulations/record_regulations.model";
import SemiProduct from "./semi_products/semi_products.model";
import ApiError from "./api_errors/api_errors.model";
import TraceCan from "./trace_models/trace_can.model";
import TraceCanRecord from "./trace_models/trace_can_record.model";
import TracePlant from "./trace_models/trace_plant.model";
import TraceCanState from "./trace_models/trace_can_state.model";
import TraceBtProduct from "./trace_models/trace_bt_product.model";
import TraceCanLocation from "./trace_models/trace_can_location.model";
import TubeProduct from "./tube_products/tube_products.model";
import TubeConveyor from "./tube_conveyors/tube_conveyors.model";
import TubeRecord from "./tube_records/tube_records.model";
import TubeMaterial from "./tube_materials/tube_materials.model";
import TubeConveyorPost from "./tube_conveyor_posts/tube_conveyor_posts.model";
import TubeSpecification from "./tube_specifications/tube_specifications.model";
import TubeHistoryType from "./tube_history_types/tube_history_types.model";
import TubeHistory from "./tube_histories/tube_histories.model";
import TubeHistoryNote from "./tube_history_notes/tube_history_notes.model";
import TubeSession from "./tube_sessions/tube_sessions.model";
import TubeParameter from "./tube_parameters/tube_parameters.model";
import TubeAssembly from "./tube_assembly/tube_assembly.model";
import TraceInventoryDoc from "./trace_models/trace_inventory_doc.model";
import TraceInventoryRow from "./trace_models/trace_inventory_row.model";
import TraceAuthorOccupation from "./trace_models/tarce_author_occupation.model";
import * as DataTypes from "sequelize/lib/data-types";

DataTypes.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);
  return date.format("YYYY-MM-DD HH:mm:ss.SSS");
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
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
      logging: process.env.NODE_ENV === "development" ? true : false,
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
      logging: process.env.NODE_ENV === "development" ? true : false,
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
      logging: process.env.NODE_ENV === "development" ? true : false,
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
        // ********************
        TubeProduct,
        TubeConveyor,
        TubeRecord,
        TubeMaterial,
        TubeConveyorPost,
        TubeSpecification,
        TubeHistoryType,
        TubeHistory,
        TubeHistoryNote,
        TubeSession,
        TubeParameter,
        TubeAssembly,
      ],
      // autoLoadModels: true,
    }),
    // SeederModule.forRoot({
    //   runOnlyIfTableIsEmpty: true,
    //   foreignDelay: 10000,
    // }),
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
    TubeProductsModule,
    TubeConveyorsModule,
    TubeRecordsModule,
    TubeMaterialsModule,
    TubeConveyorPostsModule,
    TubeSpecificationsModule,
    TubeHistoryTypesModule,
    TubeHistoriesModule,
    TubeHistoryNotesModule,
    TubeSessionsModule,
    TubeParametersModule,
    TubeAssemblyModule,
    TraceInventoryDocsModule,
    TraceInventoryRowsModule,
    TraceTrademarksModule,
    ZplModule,
    TestdbSqlModule,
    TraceDirectConnectionModule,
  ],
})
export default class AppModule {}
