import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { pgPrisma } from '@repo/db';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
    readonly client = pgPrisma;

    async onModuleInit() {
        await this.client.$connect();
    }

    async onModuleDestroy() {
        await this.client.$disconnect();
    }
}
