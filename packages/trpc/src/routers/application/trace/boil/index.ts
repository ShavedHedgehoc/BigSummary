import {
  applicationUploadTraceBoilInputSchema,
  applicationUploadTraceBoilOutputSchema,
} from '@repo/schemas';
import { publicProcedure, router } from '../../../../trpc';
import { TRPCError } from '@trpc/server';

export const applicationTraceBoilRouter = router({
  uploadTraceBoils: publicProcedure
    .input(applicationUploadTraceBoilInputSchema)
    .output(applicationUploadTraceBoilOutputSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return ctx.applicationTraceBoilService.uploadTraceBoils(input);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Ошибка удаления',
          cause: error,
        });
      }
    }),
});
