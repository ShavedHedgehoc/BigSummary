import { Module } from "@nestjs/common";
import { CansService } from "./cans.service";
import { CansController } from "./cans.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import Can from "./cans.model";

@Module({
  providers: [CansService],
  controllers: [CansController],
  imports: [SequelizeModule.forFeature([Can])],
  exports: [CansService],
})
export class CansModule {}
