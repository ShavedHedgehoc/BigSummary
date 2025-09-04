import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/client';
// import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {}
