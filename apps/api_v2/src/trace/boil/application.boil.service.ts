import { Injectable } from '@nestjs/common';
import { mssqlPrisma } from '@repo/db-mssql';
import {
  TApplicationUploadTraceBoilInput,
  TApplicationUploadTraceBoilResponse,
} from '@repo/schemas';
import { IApplicationTraceBoilService } from '@repo/trpc';
import * as xmljs from 'xml-js';

interface SqlProcedureResult {
  result: number;
}

@Injectable()
export class ApplicationTraceBoilService implements IApplicationTraceBoilService {
  async uploadTraceBoils(
    input: TApplicationUploadTraceBoilInput,
  ): Promise<TApplicationUploadTraceBoilResponse> {
    const options = { compact: true };
    const xml = xmljs.js2xml(input, options);
    const qry = `EXEC dbo.InsertBoilsXml3 @documentXml = @p1, @result = @p2;`;
    const results = await mssqlPrisma.$queryRawUnsafe<SqlProcedureResult[]>(qry, xml, 0);

    if (!results || results.length === 0) {
      return null;
    }
    const dbResult = results[0].result;
    return {
      value: dbResult,
    };
  }
}
