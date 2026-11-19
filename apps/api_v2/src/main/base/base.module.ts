import { Module } from '@nestjs/common';
import { ApplicationBaseService } from './application.base.service';

@Module({
  imports: [],
  exports: [ApplicationBaseService],
  providers: [ApplicationBaseService],
})
export class BaseModule {}
