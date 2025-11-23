import { Body, Controller, HttpCode, Post, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { LoginUserDto } from "src/users/dto/login-user.dto";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { TokenService } from "src/token/token.service";

@ApiTags("Авторизация")
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  @UsePipes(ValidationPipe)
  @Post("/login")
  @HttpCode(200)
  async login(@Body() dto: LoginUserDto, @Res({ passthrough: true }) response: Response) {
    const [res, refreshToken] = await this.authService.login(dto);
    response.cookie("refreshToken", refreshToken);
    return res;
  }

  @UsePipes(ValidationPipe)
  @Post("/register")
  async register(@Body() dto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
    const [res, refreshToken] = await this.authService.register(dto);
    response.cookie("refreshToken", refreshToken);
    return res;
  }

  @Post("/refresh")
  async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    // console.log("refresh");
    const [res, refreshToken] = await this.authService.refresh(request.cookies["refreshToken"]);
    response.cookie("refreshToken", refreshToken);
    return res;
  }

  @Post("/check")
  async check(@Req() request: Request) {
    // console.log(request.headers.authorization);
    const res = await this.authService.check(request.headers.authorization);
    return res;
  }

  // for tanstack auth get user info

  @Post("/get_user")
  @HttpCode(200)
  async getUser(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const res = await this.authService.getUser(request.cookies["refreshToken"]);
    return res;
  }

  @Post("/logout")
  @HttpCode(200)
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    await this.tokenService.removeToken(request.cookies["refreshToken"]);
    response.clearCookie("refreshToken");
  }
}
