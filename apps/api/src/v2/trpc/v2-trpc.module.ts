import { Module, Global } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { PrismaService } from '../prisma/prisma.service';
import { TrpcContextFactory } from './trpc-context.factory';
import { TrpcPanelController } from './trpc-panel.controller';
import { WorkstationEmployeeRouter } from '../employees/workstation-employee.router';
import { OccupationRouter } from '../occupations/occupation.router';

@Global()
@Module({
    imports: [
        TRPCModule.forRoot({
            basePath: '/trpc',
            context: TrpcContextFactory,

        }),
    ],
    providers: [PrismaService, TrpcContextFactory],
    exports: [PrismaService],
    controllers: [TrpcPanelController],
})
export class V2TrpcModule { }
