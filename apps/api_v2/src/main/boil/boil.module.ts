import { Module } from '@nestjs/common';
import { DashBoilService } from './dash.boil.service';
import { BoilCommonService } from './boil.common.service';

@Module({
  imports: [],
  exports: [DashBoilService],
  providers: [DashBoilService, BoilCommonService],
})
export class BoilModule {}
