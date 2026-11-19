import { applicationUpdateBaseInputSchema, applicationUpdateBaseOutputSchema } from '@repo/schemas';
import { publicProcedure, router } from '../../../../trpc';
import { TRPCError } from '@trpc/server';

export const applicationBaseRouter = router({
  bulkUpdateBases: publicProcedure
    .input(applicationUpdateBaseInputSchema)
    .output(applicationUpdateBaseOutputSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return ctx.applicationBaseService.bulkUpdateBases(input);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Ошибка загрузки',
          cause: error,
        });
      }
    }),
});
