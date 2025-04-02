import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import TubeConveyorPost from "./tube_conveyor_posts.model";

@Injectable()
export class TubeConveyorPostsService {
  constructor(
    @InjectModel(TubeConveyorPost)
    private tubeConveyorPostRepository: typeof TubeConveyorPost
  ) {}

  async getOrCreateByName(name: string) {
    const existsPost = await this.tubeConveyorPostRepository.findOne({ where: { name: name } });
    if (existsPost) {
      return existsPost;
    }
    const post = await this.tubeConveyorPostRepository.create({ name: name });
    return post;
  }
}
