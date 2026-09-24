import { publicProcedure, router } from '../../../../trpc';
import { applicationBoilListOutputSchema, getApplicationLabBoilListInput } from '@repo/schemas';

export const applicationMainBoilRouter = router({
  getBoilList: publicProcedure
    .input(getApplicationLabBoilListInput)
    .output(applicationBoilListOutputSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.applicationBoilService.getBoilList(input);
    }),
});
