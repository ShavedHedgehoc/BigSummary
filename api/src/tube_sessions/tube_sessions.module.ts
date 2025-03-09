import { Module } from "@nestjs/common";
import { TubeSessionsService } from "./tube_sessions.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { TubeSessionsController } from "./tube_sessions.controller";
import TubeSession from "./tube_sessions.model";
import { TubeConveyorsModule } from "src/tube_conveyors/tube_conveyors.module";

@Module({
  providers: [TubeSessionsService],
  imports: [SequelizeModule.forFeature([TubeSession]), TubeConveyorsModule],
  controllers: [TubeSessionsController],
})
export class TubeSessionsModule {}
