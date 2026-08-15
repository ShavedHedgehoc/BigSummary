import { Module } from '@nestjs/common';
import { ConveyorsService } from './conveyors.service';
import { ConveyorsController } from './conveyors.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ConveyorsService],
  controllers: [ConveyorsController],
  imports: [PrismaModule],
})
export class ConveyorsModule {}
