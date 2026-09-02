import { Module } from '@nestjs/common';
import { ConveyorsService } from './conveyors.service';
import { ConveyorsController } from './conveyors.controller';

@Module({
  providers: [ConveyorsService],
  controllers: [ConveyorsController],
  exports: [ConveyorsService],
})
export class ConveyorsModule {}
