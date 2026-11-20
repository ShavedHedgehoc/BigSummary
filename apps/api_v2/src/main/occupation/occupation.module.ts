import { Module } from '@nestjs/common';
import { ApplicationOccupationService } from './application.occupation.service';

@Module({
  exports: [ApplicationOccupationService],
  providers: [ApplicationOccupationService],
})
export class OccupationModule {}
