import { Module } from "@nestjs/common";
import { HealthCheckService } from "./health_check.service";
import { HealthCheckController } from "./health_check.controller";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  providers: [HealthCheckService],
  imports: [SequelizeModule.forFeature([])],
  controllers: [HealthCheckController],
  exports: [HealthCheckService],
})
export class HealthCheckModule {}
