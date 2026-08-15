import { Module } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { SequelizeModule } from '@nestjs/sequelize';
import History from 'src/models/histories.model';

@Module({
  providers: [HistoriesService],
  imports: [SequelizeModule.forFeature([History])],
  exports: [HistoriesService],
})
export class HistoriesModule {}
