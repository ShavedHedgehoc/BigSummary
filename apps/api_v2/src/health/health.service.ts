import { Injectable } from '@nestjs/common';
import { IHealthService } from '@repo/trpc';
import { THealthCheckOutput } from '@repo/schemas';

@Injectable()
export class HealthService implements IHealthService {
  async check(): Promise<THealthCheckOutput> {
    return Promise.resolve({ status: 'Ok' });
  }
}
