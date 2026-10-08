import { All, Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { nodeHTTPRequestHandler } from '@trpc/server/adapters/node-http';
import { appRouter } from '@repo/trpc';
import { TrpcService } from './trpc.service';
import { Request, Response } from 'express';
import { renderTrpcPanel } from '@ajayche/trpc-panel';

@Controller('trpc')
export class TrpcController {
  constructor(
    @Inject('TRPC_SERVICE')
    private readonly trpcService: TrpcService,
  ) {}

  @Get('studio')
  getStudio(@Req() req: Request, @Res() res: Response) {
    if (process.env.NODE_ENV !== 'production') {
      const host = req.headers.host || `localhost:${process.env.API_PORT || 7000}`;
      const protocol = req.protocol || 'http';
      const html = renderTrpcPanel(appRouter, {
        url: `${protocol}://${host}/trpc`,
        transformer: 'superjson',
        meta: {
          title: 'tRPC Api',
          description: '1.0.0',
        },
      });

      res.setHeader('Content-Type', 'text/html');
      return res.send(html);
    }
    return res.status(404).send('Not Found');
  }

  @All(':path')
  async handle(@Req() req: Request, @Res() res: Response) {
    const trpcService = this.trpcService;
    return nodeHTTPRequestHandler({
      path: req.params.path,
      req: req,
      res: res,
      router: appRouter,
      createContext: async (opts) => {
        const baseContext = await trpcService.createContext(opts);
        return baseContext;
      },
    });
  }
}
