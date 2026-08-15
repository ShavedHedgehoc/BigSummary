import Token from "./token.model";
export declare class TokenService {
    private tokenRepository;
    constructor(tokenRepository: typeof Token);
    createOrUpdate(userId: number, refreshToken: string): Promise<Token>;
    findByToken(userId: number, refreshToken: string): Promise<Token>;
    removeToken(refreshToken: string): Promise<void>;
    removeTokenByUserId(id: number): Promise<void>;
    refreshToken(refreshToken: string): Promise<void>;
}
