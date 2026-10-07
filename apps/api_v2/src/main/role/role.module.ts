import { Module } from '@nestjs/common';
import { ApplicationRoleService } from './application.role.service';

@Module({
  exports: [ApplicationRoleService],
  providers: [ApplicationRoleService],
})
export class RoleModule {}
