import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TrpcModule } from './trpc/trpc.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), '../../', `.${process.env.NODE_ENV}.env`),

    }),
    TrpcModule,
  ],
})
export class AppModule { }