import { Module } from "@nestjs/common";
import { TubeSpecificationsService } from "./tube_specifications.service";
import { SequelizeModule } from "@nestjs/sequelize";
import TubeSpecification from "./tube_specifications.model";

@Module({
  providers: [TubeSpecificationsService],
  imports: [SequelizeModule.forFeature([TubeSpecification])],
})
export class TubeSpecificationsModule {}
