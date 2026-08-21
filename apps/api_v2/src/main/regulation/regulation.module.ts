import { Module } from '@nestjs/common';
import { RegulationCommonService } from './regulation.common.service';

@Module({
  providers: [RegulationCommonService],
  exports: [RegulationCommonService],
})
export class RegulationModule {}
