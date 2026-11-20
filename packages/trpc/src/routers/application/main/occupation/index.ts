import { publicProcedure, router } from '../../../../trpc';
import { applicationOccupationListOutputSchema } from '@repo/schemas';

export const applicationMainOccupationRouter = router({
  getOccupationList: publicProcedure
    .output(applicationOccupationListOutputSchema.nullable())
    .query(async ({ ctx }) => {
      return ctx.applicationOccupationService.getOccupationList();
    }),
});
