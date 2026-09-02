import { publicProcedure, router } from '../../../../trpc';
import { getPlantByValueSchema, plantByValueOutputSchema } from '@repo/schemas';

export const dashMainPlantRouter = router({
  getPlantByValue: publicProcedure
    .input(getPlantByValueSchema)
    .output(plantByValueOutputSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.dashPlantService.getPlantByValue(input);
    }),
});
