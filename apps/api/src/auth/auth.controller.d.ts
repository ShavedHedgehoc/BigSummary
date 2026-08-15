import { CreateUserDto } from "src/users/dto/create-user.dto";
import { LoginUserDto } from "src/users/dto/login-user.dto";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { TokenService } from "src/token/token.service";
export declare class AuthController {
    private authService;
    private tokenService;
    constructor(authService: AuthService, tokenService: TokenService);
    login(dto: LoginUserDto, response: Response): Promise<string | {
        user: import("./mapper").IUserData;
        accessToken: string;
    }>;
    register(dto: CreateUserDto, response: Response): Promise<string | {
        user: import("./mapper").IUserData;
        accessToken: string;
    }>;
    refresh(request: Request, response: Response): Promise<string | {
        user: import("./mapper").IUserData;
        accessToken: string;
    }>;
    check(request: Request): Promise<{
        user: import("./mapper").IUserData;
        accessToken: string;
    }>;
    getUser(request: Request, response: Response): Promise<import("./mapper").IUserData>;
    logout(request: Request, response: Response): Promise<void>;
}
