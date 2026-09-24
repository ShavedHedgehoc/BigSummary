import { publicProcedure, router } from '../../../../trpc';
import { applicationHistoryTypeListOutputSchema } from '@repo/schemas';

export const applicationMainHistoryTypeRouter = router({
  getAllHistoryTypeList: publicProcedure
    .output(applicationHistoryTypeListOutputSchema.nullable())
    .query(async ({ ctx }) => {
      return ctx.applicationHistoryTypeService.getAllHistoryTypeList();
    }),
  getProductHistoryTypeList: publicProcedure
    .output(applicationHistoryTypeListOutputSchema.nullable())
    .query(async ({ ctx }) => {
      return ctx.applicationHistoryTypeService.getProductHistoryTypeList();
    }),
  getBoilHistoryTypeList: publicProcedure
    .output(applicationHistoryTypeListOutputSchema.nullable())
    .query(async ({ ctx }) => {
      return ctx.applicationHistoryTypeService.getBoilHistoryTypeList();
    }),
});
