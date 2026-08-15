import { Module, forwardRef } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { TokenModule } from "src/token/token.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "VERY SECRET KEY",
      signOptions: {
        expiresIn: "24h",
      },
    }),
    TokenModule,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
