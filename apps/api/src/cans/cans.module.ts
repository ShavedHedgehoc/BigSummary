import { Module } from "@nestjs/common";
import { CansService } from "./cans.service";
import { SequelizeModule } from "@nestjs/sequelize";
import Can from "./cans.model";

@Module({
  providers: [CansService],
  controllers: [],
  imports: [SequelizeModule.forFeature([Can])],
  exports: [CansService],
})
export class CansModule {}
