import {
  applicationGetTraceBoilWghtReportInputSchema,
  applicationTraceBoilWghtReportOutputSchema,
} from '@repo/schemas';
import { publicProcedure, router } from '../../../../trpc';

export const applicationTraceBoilRouter = router({
  getWghtReport: publicProcedure
    .input(applicationGetTraceBoilWghtReportInputSchema)
    .output(applicationTraceBoilWghtReportOutputSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.applicationTraceBoilService.getWeightingReport(input);
    }),
});
