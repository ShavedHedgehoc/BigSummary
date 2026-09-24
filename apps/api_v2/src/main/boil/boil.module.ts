import { Module } from '@nestjs/common';
import { DashBoilService } from './dash.boil.service';
import { BoilCommonService } from './boil.common.service';
import { ApplicationBoilService } from './application.boil.service';

@Module({
  imports: [],
  exports: [DashBoilService, ApplicationBoilService],
  providers: [ApplicationBoilService, DashBoilService, BoilCommonService],
})
export class BoilModule {}
