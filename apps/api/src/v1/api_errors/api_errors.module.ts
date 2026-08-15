import { Module } from "@nestjs/common";
import { ApiErrorsService } from "./api_errors.service";
import { ApiErrorsController } from "./api_errors.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import ApiError from "./api_errors.model";

@Module({
  providers: [ApiErrorsService],
  controllers: [ApiErrorsController],
  imports: [SequelizeModule.forFeature([ApiError])],
  exports: [ApiErrorsService],
})
export class ApiErrorsModule {}
