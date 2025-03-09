import { Module } from "@nestjs/common";
import { TubeConveyorPostsService } from "./tube_conveyor_posts.service";
import { SequelizeModule } from "@nestjs/sequelize";
import TubeConveyorPost from "./tube_conveyor_posts.model";

@Module({
  providers: [TubeConveyorPostsService],
  imports: [SequelizeModule.forFeature([TubeConveyorPost])],
})
export class TubeConveyorPostsModule {}
