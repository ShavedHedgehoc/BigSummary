import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { LoginUserDto } from "src/users/dto/login-user.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import User from "src/users/users.model";
import { TokenService } from "src/token/token.service";

import * as mapper from "./mapper";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokenService: TokenService,
    private jwtService: JwtService
  ) {}

  private cleanJWT(token: any) {
    const cleanToken = { ...token };
    delete cleanToken.iat;
    delete cleanToken.exp;
    return cleanToken;
  }

  async login(dto: LoginUserDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.getTokens(user);
    await this.tokenService.createOrUpdate(user.id, tokens.refreshToken);
    return [{ user: mapper.toRegisteredUserData(user), accessToken: tokens.accessToken }, tokens.refreshToken];

    // return this.generateToken(user);
  }

  async register(dto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException("Пользователь уже существует", HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.createUser({ ...dto, password: hashPassword });
    const tokens = await this.getTokens(user);
    await this.tokenService.createOrUpdate(user.id, tokens.refreshToken);
    return [{ user: mapper.toRegisteredUserData(user), accessToken: tokens.accessToken }, tokens.refreshToken];
  }

  async refresh(token: string) {
    if (!token) {
      throw new HttpException("Не авторизован", HttpStatus.UNAUTHORIZED);
    }
    const userData = await this.verifyToken(token);
    const user = await this.userService.getByPk(userData.id);
    const tokenFromDb = await this.tokenService.findByToken(user.id, token);
    if (!tokenFromDb) {
      throw new HttpException("Не авторизован", HttpStatus.UNAUTHORIZED);
    }
    const tokens = await this.getTokens(user);
    await this.tokenService.createOrUpdate(user.id, tokens.refreshToken);
    // return tokens;
    return [{ user: mapper.toRegisteredUserData(user), accessToken: tokens.accessToken }, tokens.refreshToken];
  }

  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async verifyToken(token: string) {
    try {
      const userData = await this.jwtService.verify(token, { secret: "JWT_REFRESH_SECRET" });
      return this.cleanJWT(userData);
    } catch (error) {
      throw new HttpException("Не авторизован", HttpStatus.UNAUTHORIZED);
    }
  }

  async getTokens(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: "JWT_ACCESS_SECRET",
        expiresIn: "15m",
      }),
      this.jwtService.signAsync(payload, {
        secret: "JWT_REFRESH_SECRET",
        expiresIn: "7d",
      }),
    ]);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  private async validateUser(dto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!user) {
      throw new HttpException("Пользователь с таким email не найден", HttpStatus.NOT_FOUND);
    }
    const passEquals = await bcrypt.compare(dto.password, user.password);
    if (user && passEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: "Некорректный пароль" });
  }
}
