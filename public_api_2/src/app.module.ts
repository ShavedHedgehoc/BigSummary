import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConveyorsModule } from './conveyors/conveyors.module';
import { ConveyorTasksModule } from './conveyor_tasks/conveyor_tasks.module';
import { CountersModule } from './counters/counters.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import User from './models/users.model';
import Role from './models/roles.model';
import UserRoles from './models/user-roles.model';
import Employee from './models/employees.model';
import Occupation from './models/occupations.model';
import Product from './models/products.model';
import Serie from './models/series.model';
import Doc from './models/docs.model';
import Plant from './models/plant.model';
import Can from './models/cans.model';
import Record from './models/records.model';
import Apparatus from './models/apparatus.model';
import Boil from './models/boil.model';
import Conveyor from './models/conveyor.model';
import Workshop from './models/workshop.model';
import HistoryType from './models/history_types.model';
import Token from './models/token.model';
import Base from './models/bases.model';
import Note from './models/notes.model';
import Regulation from './models/regulations.model';
import MarkingSample from './models/marking_sample.model';
import RecordRegulation from './models/record_regulations.model';
import SemiProduct from './models/semi_products.model';
import RecordCounter from './models/record-counters.model';
import History from './models/histories.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      logging: process.env.NODE_ENV === 'development' ? true : false,
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
        RecordCounter,
      ],
    }),
    ConveyorsModule,
    ConveyorTasksModule,
    CountersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
