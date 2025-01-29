import { Module } from "@nestjs/common";
import { RegulationsController } from "./regulations.controller";
import { RegulationsService } from "./regulations.service";
import { SequelizeModule } from "@nestjs/sequelize";
import Regulation from "./regulations.model";

@Module({
  controllers: [RegulationsController],
  imports: [SequelizeModule.forFeature([Regulation])],
  providers: [RegulationsService],
})
export class RegulationsModule {}
