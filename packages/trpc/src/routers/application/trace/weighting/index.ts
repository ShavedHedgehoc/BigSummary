import {
  applicationDeleteTraceWeightingInputSchema,
  applicationDeleteTraceWeightingOutputSchema,
  applicationTraceWeightingListInputSchema,
  applicationTraceWeightingListOutputSchema,
} from '@repo/schemas';
import { publicProcedure, router } from '../../../../trpc';
import { TRPCError } from '@trpc/server';

export const applicationTraceWeightingRouter = router({
  getWeightingList: publicProcedure
    .input(applicationTraceWeightingListInputSchema)
    .output(applicationTraceWeightingListOutputSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.applicationTraceWeightingService.getWeightingList(input);
    }),
  deleteWeighting: publicProcedure
    .input(applicationDeleteTraceWeightingInputSchema)
    .output(applicationDeleteTraceWeightingOutputSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.applicationTraceWeightingService.deleteWeighting(input);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Ошибка удаления',
          cause: error,
        });
      }
    }),
});
