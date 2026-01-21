import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { EmployeesModule } from "./employees/employees.module";
import { ParamsModule } from "./params/params.module";
import { HealthCheckModule } from "./health-check/health-check.module";
import { ConveyorsModule } from "./conveyors/conveyors.module";
import { SummariesModule } from "./summaries/summaries.module";
import { RondelsModule } from "./rondels/rondels.module";
import { ConsumedMaterialsModule } from "./consumed-materials/consumed-materials.module";
import { ProductsModule } from "./products/products.module";
import { PicturesModule } from "./pictures/pictures.module";
import { UploadModule } from "./upload/upload.module";
import { StatusesModule } from "./statuses/statuses.module";
import { OperationsModule } from "./operations/operations.module";
import { ZplModule } from "./zpl/zpl.module";
import { ProductionBoxModule } from "./production-box/production-box.module";
import { PrinterModule } from "./printer/printer.module";
import { SopModule } from './sop/sop.module';
import { RanksModule } from './ranks/ranks.module';
import { TresholdsModule } from './tresholds/tresholds.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    SummariesModule,
    ParamsModule,
    ConsumedMaterialsModule,
    EmployeesModule,
    ConveyorsModule,
    RondelsModule,
    HealthCheckModule,
    ProductsModule,
    PicturesModule,
    UploadModule,
    StatusesModule,
    OperationsModule,
    ZplModule,
    ProductionBoxModule,
    PrinterModule,
    SopModule,
    RanksModule,
    TresholdsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
