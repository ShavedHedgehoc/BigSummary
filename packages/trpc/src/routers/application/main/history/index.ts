import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from '../../../../trpc';
import { applicationDeleteHistoryInputSchema, commonHistoryCreateInputSchema } from '@repo/schemas';

export const applicationMainHistoryRouter = router({
  createHistory: publicProcedure
    .input(commonHistoryCreateInputSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.applicationHistoryService.createHistory(input);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Ошибка созадния',
          cause: error,
        });
      }
    }),
  directCreateHistory: publicProcedure
    .input(commonHistoryCreateInputSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.applicationHistoryService.directCreateHistory(input);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Ошибка созадния',
          cause: error,
        });
      }
    }),
  deleteHistory: publicProcedure
    .input(applicationDeleteHistoryInputSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.applicationHistoryService.deleteHistory(input);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Ошибка созадния',
          cause: error,
        });
      }
    }),
});
