import { Module } from '@nestjs/common';
import { CountersService } from './counters.service';
import { CountersController } from './counters.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [CountersService],
  controllers: [CountersController],
  imports: [PrismaModule],
})
export class CountersModule {}
