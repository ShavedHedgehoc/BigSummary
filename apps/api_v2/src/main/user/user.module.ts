import { Module } from '@nestjs/common';
import { ApplicationUserService } from './application.user.service';

@Module({
  exports: [ApplicationUserService],
  providers: [ApplicationUserService],
})
export class UserModule {}
