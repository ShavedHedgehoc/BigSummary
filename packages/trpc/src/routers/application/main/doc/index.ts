import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from '../../../../trpc';
import {
  applicationDeleteDocInputSchema,
  applicationDeleteDocOutputSchema,
  applicationDeleteDocRowInputSchema,
  applicationDeleteDocRowOutputSchema,
  applicationDocDetailOutputSchema,
  applicationDocListOutputSchema,
  applicationDocStatsResponseSchema,
  applicationGetCurrentDocInputSchema,
  applicationGetDocDetailInputSchema,
  applicationUpdateDocRowInputSchema,
  applicationUpdateDocRowOutputSchema,
  applicationUploadDocInputSchema,
  applicationUploadDocOutputSchema,
  getApplicationDocListInputSchema,
} from '@repo/schemas';

export const applicationMainDocRouter = router({
  getDocList: publicProcedure
    .input(getApplicationDocListInputSchema)
    .output(applicationDocListOutputSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.applicationDocService.getDocList(input);
    }),
  getStats: publicProcedure
    .input(getApplicationDocListInputSchema)
    .output(applicationDocStatsResponseSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.applicationDocService.getStats(input);
    }),
  getDetail: publicProcedure
    .input(applicationGetDocDetailInputSchema)
    .output(applicationDocDetailOutputSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.applicationDocService.getDetails(input);
    }),
  getCurrentDoc: publicProcedure
    .input(applicationGetCurrentDocInputSchema)
    .output(applicationDocDetailOutputSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.applicationDocService.getCurrentDoc(input);
    }),
  deleteDoc: publicProcedure
    .input(applicationDeleteDocInputSchema)
    .output(applicationDeleteDocOutputSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.applicationDocService.deleteDoc(input);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Ошибка удаления',
          cause: error,
        });
      }
    }),
  deleteDocRow: publicProcedure
    .input(applicationDeleteDocRowInputSchema)
    .output(applicationDeleteDocRowOutputSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.applicationDocService.deleteDocRow(input);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Ошибка удаления',
          cause: error,
        });
      }
    }),
  updateDocRow: publicProcedure
    .input(applicationUpdateDocRowInputSchema)
    .output(applicationUpdateDocRowOutputSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.applicationDocService.updateDocRow(input);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Ошибка удаления',
          cause: error,
        });
      }
    }),
  uploadData: publicProcedure
    .input(applicationUploadDocInputSchema)
    .output(applicationUploadDocOutputSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.applicationDocService.uploadData(input);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Ошибка удаления',
          cause: error,
        });
      }
    }),
});
