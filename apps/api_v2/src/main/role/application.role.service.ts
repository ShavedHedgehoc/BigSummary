import { Injectable } from '@nestjs/common';
import { IApplicationRoleService } from '@repo/trpc';
import { TApplicationRoleListResponse } from '@repo/schemas';
import { pgPrisma } from '@repo/db-postgres';

@Injectable()
export class ApplicationRoleService implements IApplicationRoleService {
  async getRoleList(): Promise<TApplicationRoleListResponse> {
    const roles = await pgPrisma.roles.findMany({});
    return roles;
  }
}
