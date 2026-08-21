import { Module } from '@nestjs/common';
import { SemiProductCommonService } from './semi-product.common.service';

@Module({
  providers: [SemiProductCommonService],
  exports: [SemiProductCommonService],
})
export class SemiProductModule {}
