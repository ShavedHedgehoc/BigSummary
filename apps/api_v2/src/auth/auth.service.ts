import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { TLoginInput, TLoginResponse, TRegisteredUser, TRegisterInput } from '@repo/schemas';
import * as bcrypt from 'bcryptjs';
import { IAuthService } from '@repo/trpc';
import { pgPrisma } from '@repo/db-postgres';
import { UserWithRoles } from './mapper';
import * as mapper from './mapper';

@Injectable()
export class AuthService implements IAuthService {
  private readonly jwtService = new JwtService();

  private async validateUser(input: TLoginInput): Promise<UserWithRoles> {
    const user = await pgPrisma.users.findUnique({
      where: { email: input.email },
      include: {
        user_roles: { include: { roles: true } },
        user_settings: { include: { plants: true } },
      },
    });
    if (!user) {
      throw new HttpException('Пользователь с таким email не найден', HttpStatus.NOT_FOUND);
    }

    const passEquals = await bcrypt.compare(input.password, user.password);
    if (user && passEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Некорректный пароль' });
  }

  private generateTokens = async (user: UserWithRoles) => {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.user_roles.map((ur) => ur.roles.value),
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: 'JWT_ACCESS_SECRET',
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: 'JWT_REFRESH_SECRET',
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  };

  async me(userId: number): Promise<TRegisteredUser> {
    const user = await pgPrisma.users.findUnique({
      where: { id: userId },
      include: {
        user_roles: { include: { roles: true } },
        user_settings: { include: { plants: true } },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }
    return mapper.toRegisteredUserData(user);
  }

  async login(input: TLoginInput): Promise<TLoginResponse> {
    const user = await this.validateUser(input);
    const tokens = await this.generateTokens(user);
    const existingToken = await pgPrisma.tokens.findFirst({
      where: { userId: user.id },
    });

    if (existingToken) {
      await pgPrisma.tokens.update({
        where: { id: existingToken.id },
        data: { token: tokens.refreshToken },
      });
    } else {
      await pgPrisma.tokens.create({
        data: { userId: user.id, token: tokens.refreshToken },
      });
    }

    return {
      user: mapper.toRegisteredUserData(user),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async logout(refreshToken: string): Promise<{ success: boolean }> {
    try {
      const existingToken = await pgPrisma.tokens.findUnique({
        where: { token: refreshToken },
      });

      if (existingToken) {
        await pgPrisma.tokens.delete({
          where: { id: existingToken.id },
        });
      }
    } catch (dbError) {
      console.error('Ошибка ограничений БД при удалении токена сессии:', dbError);
    }
    return { success: true };
  }

  async refresh(oldToken: string): Promise<TLoginResponse> {
    const tokenInDb = await pgPrisma.tokens.findUnique({
      where: { token: oldToken },
    });
    if (!tokenInDb) {
      throw new Error('Невалидная сессия');
    }
    try {
      await this.jwtService.verify(oldToken, { secret: 'JWT_REFRESH_SECRET' });
    } catch (_error) {
      await pgPrisma.tokens.delete({ where: { id: tokenInDb.id } }).catch(() => {});
      throw new Error('Сессия истекла');
    }

    const userId = tokenInDb.userId;

    const user = await pgPrisma.users.findUnique({
      where: { id: userId },
      include: {
        user_roles: {
          include: { roles: true },
        },
        user_settings: { include: { plants: true } },
      },
    });

    if (!user) {
      throw new Error('Пользователь не найден');
    }

    const tokens = await this.generateTokens(user);
    await pgPrisma
      .$transaction([
        pgPrisma.tokens.delete({ where: { id: tokenInDb.id } }),
        pgPrisma.tokens.create({
          data: {
            token: tokens.refreshToken,
            userId: user.id,
          },
        }),
      ])
      .catch((err) => {
        console.error('Ошибка при ротации токенов в БД:', err);
        throw new Error('Ошибка обновления сессии в базе данных');
      });

    return {
      user: mapper.toRegisteredUserData(user),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  // async register(input: TRegisterInput): Promise<TLoginResponse> {
  //   const candidate = await pgPrisma.users.findUnique({ where: { email: input.email } });
  //   if (candidate) throw new Error('Пользователь с таким email уже существует!');

  //   const hashPassword = await bcrypt.hash(input.password, 5);
  //   const user = await pgPrisma.users.create({
  //     data: {
  //       name: input.name,
  //       email: input.email,
  //       password: hashPassword,

  //       user_roles: {
  //         create: {
  //           roles: {
  //             connect: {
  //               value: 'USER',
  //             },
  //           },
  //         },
  //       },
  //       user_settings: {
  //         create: {},
  //       },
  //     },
  //     include: {
  //       user_roles: { include: { roles: true } },
  //       user_settings: { include: { plants: true } },
  //     },
  //   });

  //   const tokens = await this.generateTokens(user);
  //   await pgPrisma.tokens.create({
  //     data: { userId: user.id, token: tokens.refreshToken },
  //   });

  //   return {
  //     user: mapper.toRegisteredUserData(user),
  //     accessToken: tokens.accessToken,
  //     refreshToken: tokens.refreshToken,
  //   };
  // }
  async register(input: TRegisterInput): Promise<TLoginResponse> {
    const candidate = await pgPrisma.users.findUnique({ where: { email: input.email } });
    if (candidate) throw new Error('Пользователь с таким email уже существует!');

    const hashPassword = await bcrypt.hash(input.password, 5);

    return await pgPrisma.$transaction(async (tx) => {
      const user = await tx.users.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashPassword,
          user_roles: {
            create: {
              roles: {
                connect: {
                  value: 'USER',
                },
              },
            },
          },

          user_settings: {
            create: {},
          },
        },

        include: {
          user_roles: { include: { roles: true } },
          user_settings: { include: { plants: true } },
        },
      });
      const tokens = await this.generateTokens(user);
      await tx.tokens.create({
        data: { userId: user.id, token: tokens.refreshToken },
      });
      return {
        user: mapper.toRegisteredUserData(user),
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    });
  }
}
