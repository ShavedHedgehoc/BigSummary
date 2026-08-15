import { Injectable } from '@nestjs/common';
import { TRPCContext, ContextOptions } from 'nestjs-trpc';
import { pgPrisma } from '@repo/db-postgres'; // Ваша Призма для Postgres
// import { msPrisma } from '@repo/db-mssql';    // Ваша Призма для MSSQL (импортируйте ваш инстанс)

// Описываем структуру того, что вернет контекст
export interface ITRPCContext extends Record<string, unknown> {
    req: any;
    res: any;
    dbPg: typeof pgPrisma; // Отдельное свойство для Postgres
    //   dbMs: typeof msPrisma; // Отдельное свойство для MSSQL
}

@Injectable()
export class TrpcContextFactory implements TRPCContext {
    // Сюда можно внедрить сервисы через DI, если это необходимо
    //   constructor(private auth: AuthService) {}

    async create(options: ContextOptions): Promise<ITRPCContext> {
        return {
            req: options.req,
            res: options.res,
            dbPg: pgPrisma, // Прокидываем Postgres
            //   dbMs: msPrisma, // Прокидываем MSSQL
        };
    }
}
