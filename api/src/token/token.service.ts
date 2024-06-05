import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Token from "./token.model";

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token)
    private tokenRepository: typeof Token
  ) {}

  async createOrUpdate(userId: number, refreshToken: string) {
    const token = await this.tokenRepository.findOne({ where: { userId: userId } });
    if (token) {
      token.token = refreshToken;
      await token.save();
      return token;
    }
    const newToken = await this.tokenRepository.create({ userId: userId, token: refreshToken });
    return newToken;
  }

  async findByToken(userId: number, refreshToken: string) {
    const token = await this.tokenRepository.findOne({ where: { userId: userId, token: refreshToken } });
    return token;
  }

  async removeToken(refreshToken: string) {
    await this.tokenRepository.destroy({ where: { token: refreshToken } });
  }

  async refreshToken(refreshToken: string) {}
}
