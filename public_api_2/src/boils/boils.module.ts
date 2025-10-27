import { Module } from '@nestjs/common';
import { BoilsService } from './boils.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Boil from 'src/models/boil.model';

@Module({
  providers: [BoilsService],
  imports: [SequelizeModule.forFeature([Boil])],
  exports: [BoilsService],
})
export class BoilsModule {}
