import { Module } from '@nestjs/common';
import { ZplService } from './zpl.service';
import { ZplController } from './zpl.controller';

@Module({
  providers: [ZplService],
  controllers: [ZplController]
})
export class ZplModule {}
