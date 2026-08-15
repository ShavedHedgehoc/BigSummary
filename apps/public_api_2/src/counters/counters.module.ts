import { Module } from '@nestjs/common';
import { CountersService } from './counters.service';
import { CountersController } from './counters.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import RecordCounter from 'src/models/record-counters.model';
import { RecordsModule } from 'src/records/records.module';
import { HistoriesModule } from 'src/histories/histories.module';
import { HistoryTypesModule } from 'src/history-types/history-types.module';
import { ProductsModule } from 'src/products/products.module';
import { BoilsModule } from 'src/boils/boils.module';

@Module({
  providers: [CountersService],
  controllers: [CountersController],
  imports: [
    SequelizeModule.forFeature([RecordCounter]),
    RecordsModule,
    HistoriesModule,
    HistoryTypesModule,
    ProductsModule,
    BoilsModule,
  ],
  exports: [CountersService],
})
export class CountersModule {}
