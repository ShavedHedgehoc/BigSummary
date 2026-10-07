import { Injectable } from '@nestjs/common';
import { pgPrisma, Prisma } from '@repo/db-postgres';
import * as bcrypt from 'bcryptjs';
import {
  TApplicationChangeUserAccessInput,
  TApplicationChangeUserAccessResponse,
  TApplicationChangeUserPasswordInput,
  TApplicationChangeUserPasswordResponse,
  TApplicationDeleteUserInput,
  TApplicationDeleteUserResponse,
  TApplicationResetUserPasswordInput,
  TApplicationResetUserPasswordResponse,
  TApplicationUpdateUserInput,
  TApplicationUpdateUserResponse,
  TApplicationUpdateUserRolesInput,
  TApplicationUpdateUserRolesResponse,
  TApplicationUserItem,
  TApplicationUserListResponse,
  TGetApplicationUserListInput,
} from '@repo/schemas';
import { IApplicationUserService } from '@repo/trpc';
import { TRPCError } from '@trpc/server';

@Injectable()
export class ApplicationUserService implements IApplicationUserService {
  async getUserList(input: TGetApplicationUserListInput): Promise<TApplicationUserListResponse> {
    const { name, email, banned, roles, limit = 10, page = 1, nameAsc = true } = input;
    const where: Prisma.usersWhereInput = {};

    if (name !== '') {
      where.name = { contains: name, mode: 'insensitive' };
    }

    if (email !== '') {
      where.email = { contains: email, mode: 'insensitive' };
    }

    if (banned && banned.length > 0) {
      where.banned = banned[0] !== 1;
    }

    if (roles && roles.length > 0) {
      where.user_roles = {
        some: {
          roleId: {
            in: roles,
          },
        },
      };
    }

    const [total, users] = await Promise.all([
      pgPrisma.users.count({ where }),
      pgPrisma.users.findMany({
        where,
        include: {
          user_roles: { include: { roles: true } },
          user_settings: { include: { plants: true } },
        },

        orderBy: { name: nameAsc ? 'asc' : 'desc' },
        take: limit,
        skip: limit * (page - 1),
      }),
    ]);

    const formattedUsers: TApplicationUserItem[] = users.map((user) => {
      const {
        password: _p,
        user_roles,
        user_settings: settings,
        createdAt: _c,
        updatedAt: _u,
        ...userWithoutPassword
      } = user;

      return {
        ...userWithoutPassword,
        roles: user_roles.map((ur) => {
          const { createdAt: _c, updatedAt: _u, ...clearedRole } = ur.roles;
          return { ...clearedRole };
        }),
        user_settings: settings
          ? {
              plant: settings.plants?.value ?? '-',
              plant_id: settings.plant_id ?? null,
            }
          : {
              plant: '-',
              plant_id: null,
            },
      };
    });

    const totalPages = Math.ceil(total / limit);

    return { rows: formattedUsers, total, totalPages };
  }

  async updateUser(input: TApplicationUpdateUserInput): Promise<TApplicationUpdateUserResponse> {
    const { id, ...data } = input;
    const existsUser = await pgPrisma.users.findUnique({ where: { id } });
    if (!existsUser) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Пользователь не найден',
      });
    }
    if (data.email && data.email !== existsUser.email) {
      const emailTaken = await pgPrisma.users.findUnique({
        where: { email: data.email },
      });
      if (emailTaken) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Email уже используется',
        });
      }
    }
    const updatedUser = await pgPrisma.users.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        user_settings: {
          upsert: {
            create: {
              plant_id: data.user_settings.plant_id,
            },
            update: {
              plant_id: data.user_settings.plant_id,
            },
          },
        },
      },
    });

    return { id: updatedUser.id, success: true };
  }

  async changeUserAccess(
    input: TApplicationChangeUserAccessInput,
  ): Promise<TApplicationChangeUserAccessResponse> {
    const { id } = input;
    const user = await pgPrisma.users.findUnique({ where: { id } });
    if (!user)
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Пользователь не найден',
      });

    const updatedUser = await pgPrisma.users.update({
      where: { id },
      data: { banned: !user.banned },
    });
    return { id: updatedUser.id, success: true, banned: updatedUser.banned };
  }

  async changeUserPassword(
    input: TApplicationChangeUserPasswordInput,
  ): Promise<TApplicationChangeUserPasswordResponse> {
    const { id, oldPassword, newPassword } = input;

    const user = await pgPrisma.users.findUnique({
      where: { id },
      select: { password: true },
    });

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Пользователь не найден',
      });
    }
    const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isOldPasswordCorrect) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Неверный текущий пароль',
      });
    }

    const hashNewPassword = await bcrypt.hash(newPassword, 5);

    await pgPrisma.users.update({
      where: { id },
      data: { password: hashNewPassword },
    });

    return { id, success: true };
  }
  async resetUserPassword(
    input: TApplicationResetUserPasswordInput,
  ): Promise<TApplicationResetUserPasswordResponse> {
    const simplyPassword = '1';
    const { id } = input;
    const hashPassword = await bcrypt.hash(simplyPassword, 5);

    try {
      await pgPrisma.users.update({
        where: { id },
        data: { password: hashPassword },
      });
      return { id, success: true };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Пользователь не найден',
        });
      }
      throw error;
    }
  }

  async deleteUser(input: TApplicationDeleteUserInput): Promise<TApplicationDeleteUserResponse> {
    const { id } = input;
    const hasHistory = await pgPrisma.histories.findFirst({
      where: { userId: id },
      select: { id: true }, // Выбираем только id, чтобы не тянуть лишние данные
    });
    if (hasHistory) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'У пользователя найдены записи в истории. Удаление невозможно!',
      });
    }
    try {
      await pgPrisma.users.delete({
        where: { id },
      });
      return { id, success: true };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Пользователь не найден',
        });
      }
      throw error;
    }
  }

  async updateUserRoles(
    input: TApplicationUpdateUserRolesInput,
  ): Promise<TApplicationUpdateUserRolesResponse> {
    const { id, roles } = input;
    const user = await pgPrisma.users.findUnique({
      where: { id },
      include: { user_roles: { include: { roles: true } } },
    });
    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Пользователь не найден',
      });
    }
    const currentRolesIds = user.user_roles.map((ur) => ur.roles.id);
    const idsToAdd = roles.filter((id) => !currentRolesIds.includes(id));
    const idsToRemove = currentRolesIds.filter((id) => !roles.includes(id));
    await pgPrisma.users.update({
      where: { id },
      data: {
        user_roles: {
          deleteMany: idsToRemove.map((id) => ({
            roleId: id,
          })),

          create: idsToAdd.map((id) => ({
            roles: { connect: { id } },
          })),
        },
      },
    });
    return { id: user.id, success: true };
  }
}
