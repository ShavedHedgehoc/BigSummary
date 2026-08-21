import { publicProcedure, router } from '../../../../trpc';
import { boilListOutputSchema, getBoilListInputSchema } from '@repo/schemas';

export const dashMainBoilRouter = router({
  getBoilList: publicProcedure
    .input(getBoilListInputSchema)
    .output(boilListOutputSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.dashBoilService.getBoilList(input);
    }),
});
