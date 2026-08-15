import { Module } from "@nestjs/common";
import { BoilsController } from "./boils.controller";
import { BoilsService } from "./boils.service";
import { SequelizeModule } from "@nestjs/sequelize";
import Boil from "./boil.model";

@Module({
  controllers: [BoilsController],
  providers: [BoilsService],
  imports: [SequelizeModule.forFeature([Boil])],
  exports: [BoilsService],
})
export class BoilsModule {}
