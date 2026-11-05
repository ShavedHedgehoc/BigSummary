import { tracePlantListOutputSchema } from '@repo/schemas';
import { publicProcedure, router } from '../../../../trpc';

export const applicationTracePlantRouter = router({
  getAllPlants: publicProcedure
    .output(tracePlantListOutputSchema.nullable())
    .query(async ({ ctx }) => {
      return ctx.applicationTracePlantService.getAllPlants();
    }),
});
