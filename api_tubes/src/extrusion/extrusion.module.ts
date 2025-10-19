import { Module } from '@nestjs/common';
import { ExtrusionService } from './extrusion.service';
import { ExtrusionController } from './extrusion.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ExtrusionController],
  providers: [ExtrusionService],
  imports: [PrismaModule],
})
export class ExtrusionModule {}
