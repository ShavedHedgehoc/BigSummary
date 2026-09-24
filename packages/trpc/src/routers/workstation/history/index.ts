import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from '../../../trpc';
import {
  commonHistoryCreateInputSchema,
  workstationHistoryListInputSchema,
  workstationHistoryListOutputSchema,
} from '@repo/schemas';

export const workstationHistoryRouter = router({
  getLastEmployeeHistoriesByPlantId: publicProcedure
    .input(workstationHistoryListInputSchema)
    .output(workstationHistoryListOutputSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.workstationHistoryService.getLastEmployeeHistoriesByPlantId(input);
    }),
  createHistory: publicProcedure
    .input(commonHistoryCreateInputSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.workstationHistoryService.createHistory(input);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Ошибка созадния',
          cause: error,
        });
      }
    }),
});
