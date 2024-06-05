import { Module } from "@nestjs/common";
import { TokenService } from "./token.service";
import { SequelizeModule } from "@nestjs/sequelize";
import Token from "./token.model";
import { UsersModule } from "src/users/users.module";

@Module({
  providers: [TokenService],
  imports: [SequelizeModule.forFeature([Token])],
  exports: [TokenService],
})
export class TokenModule {}
