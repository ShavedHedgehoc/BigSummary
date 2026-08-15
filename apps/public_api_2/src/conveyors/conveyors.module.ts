import { Module } from '@nestjs/common';
import { ConveyorsService } from './conveyors.service';
import { ConveyorsController } from './conveyors.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Conveyor from 'src/models/conveyor.model';
import { RecordsModule } from 'src/records/records.module';
import { HistoriesModule } from 'src/histories/histories.module';

@Module({
  providers: [ConveyorsService],
  controllers: [ConveyorsController],
  imports: [SequelizeModule.forFeature([Conveyor]), RecordsModule, HistoriesModule],
  exports: [ConveyorsService],
})
export class ConveyorsModule {}
