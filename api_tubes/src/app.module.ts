import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { EmployeesModule } from "./employees/employees.module";
import { ExtrusionModule } from "./extrusion/extrusion.module";
import { HealthCheckModule } from "./health-check/health-check.module";
import { ConveyorsModule } from "./conveyors/conveyors.module";
import { SummariesModule } from "./summaries/summaries.module";
import { SummaryRawMaterialsModule } from "./summary-raw-materials/summary-raw-materials.module";
import { SummaryRawMaterialsCurrentModule } from "./summary-raw-materials-current/summary-raw-materials-current.module";
import { ChiefTechnologistNotesModule } from './chief-technologist-notes/chief-technologist-notes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    EmployeesModule,
    ExtrusionModule,
    HealthCheckModule,
    ConveyorsModule,
    SummariesModule,
    SummaryRawMaterialsModule,
    SummaryRawMaterialsCurrentModule,
    ChiefTechnologistNotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
