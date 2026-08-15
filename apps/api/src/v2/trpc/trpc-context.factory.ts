import { Injectable } from '@nestjs/common';
import { TRPCContext, ContextOptions } from 'nestjs-trpc';
import { pgPrisma } from '@repo/db'; // Ваша Призма из общего пакета

// Описываем структуру того, что вернет контекст
export interface ITRPCContext extends Record<string, unknown> {
    req: any;
    res: any;
    db: typeof pgPrisma;
}

@Injectable()
export class TrpcContextFactory implements TRPCContext {
    // Сюда можно внедрить сервисы, например: constructor(private auth: AuthService) {}

    async create(options: ContextOptions): Promise<ITRPCContext> {
        return {
            req: options.req,
            res: options.res,
            db: pgPrisma, // Прокидываем призму в контекст для роутеров
        };
    }
}
