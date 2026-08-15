import { Controller, Get, Res, OnModuleInit } from '@nestjs/common';
import { Response } from 'express';
import { AppRouterHost } from 'nestjs-trpc';
// 🌟 Импортируем из пропатченного пакета, поддерживающего Zod v4
import { renderTrpcPanel } from '@ajayche/trpc-panel';

@Controller('v2-studio')
export class TrpcPanelController implements OnModuleInit {
    private router: any;

    constructor(private readonly routerHost: AppRouterHost) { }

    onModuleInit() {
        this.router = this.routerHost.appRouter;
    }

    @Get()
    render(@Res() res: Response) {
        const html = renderTrpcPanel(this.router, {
            url: 'http://localhost:7000/trpc',
        });

        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(html);
    }
}
