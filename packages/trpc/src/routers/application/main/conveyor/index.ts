import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from '../../../../trpc';
import {
  getApplicationConveyorListInputSchema,
  applicationConveyorListOutputSchema,
  applicationUpdateConveyorInputSchema,
  applicationUpdateConveyorOutputSchema,
  applicationDeleteConveyorInputSchema,
  applicationDeleteConveyorOutputSchema,
} from '@repo/schemas';

export const applicationMainConveyorRouter = router({
  getConveyorList: publicProcedure
    .input(getApplicationConveyorListInputSchema)
    .output(applicationConveyorListOutputSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.applicationConveyorService.getConveyorList(input);
    }),

  updateConveyor: publicProcedure
    .input(applicationUpdateConveyorInputSchema)
    .output(applicationUpdateConveyorOutputSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.applicationConveyorService.updateConveyor(input);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Ошибка обновления',
          cause: error,
        });
      }
    }),

  deleteConveyor: publicProcedure
    .input(applicationDeleteConveyorInputSchema)
    .output(applicationDeleteConveyorOutputSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.applicationConveyorService.deleteConveyor(input);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Ошибка обновления',
          cause: error,
        });
      }
    }),
});
