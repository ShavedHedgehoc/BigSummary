import { Module } from '@nestjs/common';
import { OccupationService } from './occupation.service';
import { OccupationRouter } from './occupation.router';


@Module({
    providers: [OccupationService, OccupationRouter],
})
export class OccupationModule { }
