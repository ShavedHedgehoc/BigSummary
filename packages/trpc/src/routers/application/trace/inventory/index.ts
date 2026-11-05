import {
  applicationGetTraceInventoryDetailInputSchema,
  applicationTraceInventoryDetailOutputSchema,
  applicationTraceInventoryListOutputSchema,
  applicationGetTraceInventoryListInputSchema,
  applicationDeleteTraceInventoryInputSchema,
  applicationDeleteTraceInventoryOutputSchema,
} from '@repo/schemas';
import { publicProcedure, router } from '../../../../trpc';
import { TRPCError } from '@trpc/server';

export const applicationTraceInventoryRouter = router({
  getInventoryList: publicProcedure
    .input(applicationGetTraceInventoryListInputSchema)
    .output(applicationTraceInventoryListOutputSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.applicationTraceInventoryService.getInventoryList(input);
    }),
  getInventoryDetail: publicProcedure
    .input(applicationGetTraceInventoryDetailInputSchema)
    .output(applicationTraceInventoryDetailOutputSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.applicationTraceInventoryService.getInventoryDetail(input);
    }),

  deleteInventory: publicProcedure
    .input(applicationDeleteTraceInventoryInputSchema)
    .output(applicationDeleteTraceInventoryOutputSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.applicationTraceInventoryService.deleteInventory(input);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Ошибка удаления',
          cause: error,
        });
      }
    }),
});
