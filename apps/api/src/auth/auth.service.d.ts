import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { LoginUserDto } from "src/users/dto/login-user.dto";
import { UsersService } from "src/users/users.service";
import User from "src/users/users.model";
import { TokenService } from "src/token/token.service";
import * as mapper from "./mapper";
export declare class AuthService {
    private userService;
    private tokenService;
    private jwtService;
    constructor(userService: UsersService, tokenService: TokenService, jwtService: JwtService);
    private cleanJWT;
    login(dto: LoginUserDto): Promise<(string | {
        user: mapper.IUserData;
        accessToken: string;
    })[]>;
    register(dto: CreateUserDto): Promise<(string | {
        user: mapper.IUserData;
        accessToken: string;
    })[]>;
    refresh(token: string): Promise<(string | {
        user: mapper.IUserData;
        accessToken: string;
    })[]>;
    generateToken(user: User): Promise<{
        token: string;
    }>;
    getUser(refreshToken: string): Promise<mapper.IUserData | null>;
    verifyToken(token: string): Promise<any>;
    verifyAccessToken(token: string): Promise<any>;
    getTokens(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(): Promise<void>;
    check(authHeader: string): Promise<{
        user: mapper.IUserData;
        accessToken: string;
    }>;
    private validateUser;
    updateUser(dto: any): Promise<void>;
}
