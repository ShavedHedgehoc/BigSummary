import { publicProcedure, router } from '../../../../trpc';
import { applicationPlantListOutputSchema } from '@repo/schemas';

export const applicationMainPlantRouter = router({
  getPlantList: publicProcedure
    .output(applicationPlantListOutputSchema.nullable())
    .query(async ({ ctx }) => {
      return ctx.applicationPlantService.getPlantList();
    }),
});
