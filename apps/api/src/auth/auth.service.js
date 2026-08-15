"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../../../../../../../src/users/users.service");
const bcrypt = __importStar(require("bcryptjs"));
const token_service_1 = require("../../../../../../../src/token/token.service");
const mapper = __importStar(require("./mapper"));
let AuthService = class AuthService {
    constructor(userService, tokenService, jwtService) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.jwtService = jwtService;
    }
    cleanJWT(token) {
        const cleanToken = { ...token };
        delete cleanToken.iat;
        delete cleanToken.exp;
        return cleanToken;
    }
    async login(dto) {
        const user = await this.validateUser(dto);
        const tokens = await this.getTokens(user);
        await this.tokenService.createOrUpdate(user.id, tokens.refreshToken);
        return [
            {
                user: mapper.toRegisteredUserData(user),
                accessToken: tokens.accessToken,
            },
            tokens.refreshToken,
        ];
    }
    async register(dto) {
        const candidate = await this.userService.getUserByEmail(dto.email);
        if (candidate) {
            throw new common_1.HttpException("Пользователь уже существует", common_1.HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.userService.createUser({
            ...dto,
            password: hashPassword,
        });
        const tokens = await this.getTokens(user);
        await this.tokenService.createOrUpdate(user.id, tokens.refreshToken);
        return [
            {
                user: mapper.toRegisteredUserData(user),
                accessToken: tokens.accessToken,
            },
            tokens.refreshToken,
        ];
    }
    async refresh(token) {
        if (!token) {
            throw new common_1.HttpException("Не авторизован", common_1.HttpStatus.UNAUTHORIZED);
        }
        const userData = await this.verifyToken(token);
        const user = await this.userService.getByPk(userData.id);
        const tokenFromDb = await this.tokenService.findByToken(user.id, token);
        if (!tokenFromDb) {
            throw new common_1.HttpException("Не авторизован", common_1.HttpStatus.UNAUTHORIZED);
        }
        const tokens = await this.getTokens(user);
        await this.tokenService.createOrUpdate(user.id, tokens.refreshToken);
        return [
            {
                user: mapper.toRegisteredUserData(user),
                accessToken: tokens.accessToken,
            },
            tokens.refreshToken,
        ];
    }
    async generateToken(user) {
        const payload = { email: user.email, id: user.id, roles: user.roles };
        return {
            token: this.jwtService.sign(payload),
        };
    }
    async getUser(refreshToken) {
        if (refreshToken) {
            const userData = await this.verifyToken(refreshToken);
            const user = await this.userService.getByPk(userData.id);
            const tokenFromDb = await this.tokenService.findByToken(user.id, refreshToken);
            if (tokenFromDb) {
                return mapper.toRegisteredUserData(user);
            }
        }
        return null;
    }
    async verifyToken(token) {
        try {
            const userData = await this.jwtService.verify(token, {
                secret: "JWT_REFRESH_SECRET",
            });
            return this.cleanJWT(userData);
        }
        catch (error) {
            throw new common_1.HttpException("Не авторизован", common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async verifyAccessToken(token) {
        try {
            const userData = await this.jwtService.verify(token, {
                secret: "JWT_ACCESS_SECRET",
            });
            return this.cleanJWT(userData);
        }
        catch (error) {
            throw new common_1.HttpException("Не авторизован", common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async getTokens(user) {
        const payload = { email: user.email, id: user.id, roles: user.roles };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: "JWT_ACCESS_SECRET",
                expiresIn: "30m",
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
    async logout() { }
    async check(authHeader) {
        try {
            const bearer = authHeader.split(" ")[0];
            const token = authHeader.split(" ")[1];
            if (bearer !== "Bearer" || !token) {
                throw new common_1.UnauthorizedException({
                    message: "Пользователь не авторизован",
                });
            }
            const userData = await this.verifyAccessToken(token);
            const user = await this.userService.getByPk(userData.id);
            if (user) {
                return { user: mapper.toRegisteredUserData(user), accessToken: token };
            }
            throw new common_1.UnauthorizedException({
                message: "Пользователь не авторизован",
            });
        }
        catch (error) {
            throw new common_1.UnauthorizedException({
                message: "Пользователь не авторизован",
            });
        }
    }
    async validateUser(dto) {
        const user = await this.userService.getUserByEmail(dto.email);
        if (!user) {
            throw new common_1.HttpException("Пользователь с таким email не найден", common_1.HttpStatus.NOT_FOUND);
        }
        if (user.banned) {
            throw new common_1.HttpException("Доступ запрещен", common_1.HttpStatus.FORBIDDEN);
        }
        const passEquals = await bcrypt.compare(dto.password, user.password);
        if (user && passEquals) {
            return user;
        }
        throw new common_1.UnauthorizedException({ message: "Некорректный пароль" });
    }
    async updateUser(dto) { }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof token_service_1.TokenService !== "undefined" && token_service_1.TokenService) === "function" ? _b : Object, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map