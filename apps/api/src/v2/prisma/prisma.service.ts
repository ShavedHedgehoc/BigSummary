import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { pgPrisma } from '@repo/db-postgres';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
    readonly pgClient = pgPrisma;

    async onModuleInit() {
        await this.pgClient.$connect();
    }

    async onModuleDestroy() {
        await this.pgClient.$disconnect();
    }
}