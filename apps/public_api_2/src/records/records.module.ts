import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Record from 'src/models/records.model';

@Module({
  providers: [RecordsService],
  imports: [SequelizeModule.forFeature([Record])],
  exports: [RecordsService],
})
export class RecordsModule {}
